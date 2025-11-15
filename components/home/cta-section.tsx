import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export function CtaSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl lg:text-5xl font-bold text-balance">
                Pronto para Experimentar Nossos Doces?
              </h2>
              <p className="text-lg text-primary-foreground/90 text-pretty">
                Entre em contato conosco e solicite um orçamento personalizado para o seu pedido. Atendemos pequenas e
                grandes quantidades.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/produtos"><span>Ver Todos os Produtos</span></Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}