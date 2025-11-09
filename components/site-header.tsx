"use client"
import { Button } from "@/components/button"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+553498484644" className="flex items-center gap-2 hover:underline">
                <Phone className="size-4" />
                <span className="hidden sm:inline">(34) 98484-4644</span>
              </a>
              <a href="mailto:contato@docessaofidelis.com.br" className="flex items-center gap-2 hover:underline">
                <Mail className="size-4" />
                <span className="hidden sm:inline">contato@docessaofidelis.com.br</span>
              </a>
            </div>
            <div className="font-medium">Tradição desde 2000</div>
          </div>
        </div>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sem%20nome%20%281%29%20%281%29-vqBz106SPSsejO2YFogjWyruHk8EV4.png"
                alt="Doces São Fidélis"
                className="h-12 w-auto"
              />
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
              <Button asChild size="sm" className="rounded-full">
                <Link href="/solicitar-orcamento">Solicitar Orçamento</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent">
                <Link href="/admin/login">Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
