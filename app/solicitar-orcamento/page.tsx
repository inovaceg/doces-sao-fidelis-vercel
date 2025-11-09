import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuoteRequestForm } from "@/components/quote-request-form"
import { Package, Truck, CreditCard, Clock } from "lucide-react"

export default function QuoteRequestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16 lg:py-24 text-primary-foreground"> {/* Alterado para bg-primary e texto para primary-foreground */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-6 text-balance">
                Solicitar Orçamento
              </h1>
              <p className="text-lg text-pretty">
                Preencha o formulário com os detalhes do seu pedido e retornaremos com um orçamento personalizado.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex gap-4">
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                  <Package className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Variedade</h3>
                  <p className="text-sm text-muted-foreground">Diversos produtos e tamanhos disponíveis</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                  <CreditCard className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Preços Especiais</h3>
                  <p className="text-sm text-muted-foreground">Condições diferenciadas para grandes pedidos</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                  <Truck className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Entrega</h3>
                  <p className="text-sm text-muted-foreground">Consulte disponibilidade para sua região</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Resposta Rápida</h3>
                  <p className="text-sm text-muted-foreground">Retorno em até 24 horas úteis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Informações do Pedido</CardTitle>
                  <CardDescription>
                    Preencha todos os campos para que possamos elaborar o melhor orçamento para você.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuoteRequestForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}