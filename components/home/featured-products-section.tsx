import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package } from "lucide-react";
import React from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  ingredients?: string;
  weight?: string;
  price?: number;
  image_url?: string;
  is_featured?: boolean;
  units_per_package?: number;
  is_active?: boolean;
  display_order?: number;
  created_at: string;
}

interface FeaturedProductsSectionProps {
  featuredProducts: Product[];
}

export function FeaturedProductsSection({ featuredProducts }: FeaturedProductsSectionProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-foreground">Nosso Catálogo de Produtos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça a nossa seleção de bananadas e gomas de amido, feitas com o carinho da tradição.
          </p>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/produtos/${product.id}`} className="block">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="size-16 text-muted-foreground/30" />
                      </div>
                    )}
                    {product.is_featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description }} />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-muted mb-6">
              <Package className="size-8 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Nenhum produto em destaque no momento
            </h2>
            <p className="text-muted-foreground mb-6">
              Em breve teremos novos produtos em destaque para você.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/produtos">
              Ver Todos os Produtos
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}