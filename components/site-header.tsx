"use client"
import Link from "next/link"
import { Phone, Mail, Menu, X, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/components/cart-provider"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <Phone className="size-4" />
            <span>(34) 98484-4644</span>
            <Mail className="size-4" />
            <span>contato@docessaofidelis.com.br</span>
            <div className="font-medium">Tradição desde 2000</div>
          </div>
        </div>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand Simplificado */}
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sem%20nome%20%281%29%20%281%29-vqBz106SPSsejO2YFogjWyruHk8EV4.png"
                alt="Doces São Fidélis"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-primary">Doces São Fidélis</span>
            </div>

            {/* Navegação e Carrinho Removidos Temporariamente */}
            <div className="flex items-center md:hidden gap-2">
              <Menu className="size-6" />
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t">
              {/* Links Removidos Temporariamente */}
              <span>Menu Mobile</span>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}