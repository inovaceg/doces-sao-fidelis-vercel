"use client"
import { Button } from "@/components/button"
import Link from "next/link"
import { Phone, Mail, Menu, X, ShoppingCart, Instagram } from "lucide-react"
import { useState, useEffect } from "react" // Importar useEffect
import { useCart } from "@/components/cart-provider"
import { formatPhoneNumber } from "@/lib/utils"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false) // Novo estado para hidratação
  const { getTotalItems } = useCart()

  useEffect(() => {
    setIsMounted(true) // Define como true apenas no cliente após a montagem
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            {/* Telefone no canto esquerdo */}
            <a href="tel:+553498484644" className="flex items-center gap-2 hover:underline">
              <Phone className="size-4" />
              <span>{formatPhoneNumber("34984844644")}</span>
            </a>

            {/* Ícone do Instagram e "Tradição desde 2000" no canto direito */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/docessaofidelis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <div className="hidden sm:block font-medium">Tradição desde 2000</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/logo-doces-sao-fidelis.png"
                  alt="Doces São Fidélis"
                  className="h-12 w-auto"
                />
                <span className="text-xl font-bold text-primary">Doces São Fidélis</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/nossa-historia"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Nossa História
              </Link>
              <Link
                href="/produtos"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="/qualidade"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Qualidade
              </Link>
              <Link
                href="/contato"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contato
              </Link>
              <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent">
                <Link href="/admin/login">Login</Link>
              </Button>
              <Button asChild size="icon-sm" variant="ghost" className="relative">
                <Link href="/carrinho">
                  <span>
                    <ShoppingCart className="size-5" />
                    {isMounted && getTotalItems() > 0 && ( // Renderiza condicionalmente
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-xs font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </span>
                </Link>
              </Button>
            </nav>

            <div className="flex items-center md:hidden gap-2">
              <Button asChild size="icon-sm" variant="ghost" className="relative">
                <Link href="/carrinho">
                  <span>
                    <ShoppingCart className="size-5" />
                    {isMounted && getTotalItems() > 0 && ( // Renderiza condicionalmente
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full size-4 flex items-center justify-center text-xs font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </span>
                </Link>
              </Button>
              <button
                className="p-2 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t">
              <Link
                href="/"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/nossa-historia"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nossa História
              </Link>
              <Link
                href="/produtos"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                href="/qualidade"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Qualidade
              </Link>
              <Link
                href="/contato"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full rounded-full bg-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/admin/login">Login</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}