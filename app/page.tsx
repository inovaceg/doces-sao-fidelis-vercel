import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { unstable_noStore } from 'next/cache';
import type { Metadata } from "next"

// Importar os novos componentes modulares
import { HeroSection } from "@/components/home/hero-section"
import { AboutUsSection } from "@/components/home/about-us-section"
import { BenefitsQualitySection } from "@/components/home/benefits-quality-section"
import { FeaturedProductsSection } from "@/components/home/featured-products-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ContactNewsletterSection } from "@/components/home/contact-newsletter-section"
import { CtaSection } from "@/components/home/cta-section"
import { MapLocationSection } from "@/components/home/map-location-section"

interface Product {
  id: string
  name: string
  category: string
  description: string
  ingredients?: string
  weight?: string
  price?: number
  image_url?: string
  is_featured?: boolean
  units_per_package?: number
  is_active?: boolean
  display_order?: number
  created_at: string
}

export const revalidate = 0; // Força a renderização dinâmica, desabilita o cache para esta página

// URL de fallback para o banner, caso o Supabase não retorne nada
const FALLBACK_BANNER_URL = "/traditional-banana-candy-bananada.jpg"; 

export const metadata: Metadata = {
  title: "Bananadas e Gomas Artesanais - Doces São Fidélis",
  description: "Descubra a tradição e o sabor autêntico das bananadas e gomas de amido da Doces São Fidélis. Produtos artesanais de qualidade para todo o Brasil.",
  keywords: ["Bananada", "Goma de amido", "Doces artesanais", "Doces São Fidélis", "Comprar doces online", "Fábrica de doces", "Doces tradicionais"],
};

export default async function HomePage() {
  unstable_noStore(); // Força a renderização dinâmica para este componente de servidor
  cookies() // Esta chamada também força a página a ser renderizada dinamicamente

  console.log("HomePage rendered at:", new Date().toISOString());

  const supabase = await createClient()

  const { data: featuredProducts, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(8)

  if (productsError) {
    console.error("Error fetching featured products:", productsError)
  }

  const { data: bannerSettings, error: bannerError } = await supabase
    .from("settings")
    .select("key, value, updated_at")
    .in("key", ["homepage_banner_url_desktop", "homepage_banner_url_tablet", "homepage_banner_url_mobile"]);

  console.log("Raw banner settings from Supabase:", JSON.stringify(bannerSettings, null, 2));

  const bannerUrls: Record<string, string> = {};
  const bannerTimestamps: Record<string, string> = {};

  bannerSettings?.forEach(setting => {
    bannerUrls[setting.key] = setting.value ?? "";
    bannerTimestamps[setting.key] = setting.updated_at ? new Date(setting.updated_at).getTime().toString() : '';
  });

  console.log("Processed banner URLs:", JSON.stringify(bannerUrls, null, 2));
  console.log("Processed banner Timestamps:", JSON.stringify(bannerTimestamps, null, 2));

  const getCacheBustedUrl = (urlKey: string, fallbackUrl: string) => {
    const baseUrl = bannerUrls[urlKey];
    const timestamp = bannerTimestamps[urlKey];
    
    const effectiveBaseUrl = (baseUrl && baseUrl.trim() !== "") ? baseUrl : fallbackUrl;

    if (effectiveBaseUrl && effectiveBaseUrl.trim() !== "") {
      const effectiveTimestamp = timestamp || Date.now().toString();
      if (effectiveBaseUrl !== fallbackUrl) {
        return `${effectiveBaseUrl}?v=${effectiveTimestamp}`;
      }
      return effectiveBaseUrl;
    }
    return "";
  };

  const desktopBannerUrl = getCacheBustedUrl("homepage_banner_url_desktop", FALLBACK_BANNER_URL);
  const tabletBannerUrl = getCacheBustedUrl("homepage_banner_url_tablet", desktopBannerUrl);
  const mobileBannerUrl = getCacheBustedUrl("homepage_banner_url_mobile", desktopBannerUrl);

  if (bannerError && bannerError.code !== 'PGRST116') {
    console.error("Error fetching homepage banner URLs:", bannerError)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection
          desktopBannerUrl={desktopBannerUrl}
          tabletBannerUrl={tabletBannerUrl}
          mobileBannerUrl={mobileBannerUrl}
        />
        <AboutUsSection />
        <BenefitsQualitySection />
        <FeaturedProductsSection featuredProducts={featuredProducts || []} />
        <TestimonialsSection />
        <ContactNewsletterSection />
        <CtaSection />
        <MapLocationSection />
      </main>

      <SiteFooter />
    </div>
  )
}