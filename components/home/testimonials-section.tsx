import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareText } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-foreground">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A satisfação dos nossos clientes é a nossa maior recompensa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              <MessageSquareText className="size-8 text-primary" />
              <p className="text-muted-foreground italic">
                "As bananadas da Doces São Fidélis são incríveis! O sabor é único e traz toda a tradição que amamos."
              </p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  MS
                </div>
                <div>
                  <p className="font-semibold text-foreground">Maria Silva</p>
                  <p className="text-sm text-muted-foreground">Cliente Satisfeita</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              <MessageSquareText className="size-8 text-primary" />
              <p className="text-muted-foreground italic">
                "As gomas de amido são deliciosas e perfeitas para qualquer hora do dia. Qualidade impecável!"
              </p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  JP
                </div>
                <div>
                  <p className="font-semibold text-foreground">João Pedro</p>
                  <p className="text-sm text-muted-foreground">Comprador Frequente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              <MessageSquareText className="size-8 text-primary" />
              <p className="text-muted-foreground italic">
                "Recomendo a todos! Os doces são feitos com muito carinho e o sabor é de infância."
              </p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  AF
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ana Ferreira</p>
                  <p className="text-sm text-muted-foreground">Fã dos Doces</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}