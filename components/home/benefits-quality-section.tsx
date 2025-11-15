import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Leaf, ShoppingBag } from "lucide-react";

export function BenefitsQualitySection() {
  return (
    <section className="py-20 lg:py-32 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-foreground">
            A Qualidade é o Nosso Maior Compromisso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Usamos apenas ingredientes naturais, processos artesanais e controle rigoroso em cada etapa da produção.
          </p>
        </div>

        {/* Imagem adicionada aqui */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-12">
          <img
            src="/producao-geral.jpg"
            alt="Equipe Doces São Fidélis trabalhando na produção de doces artesanais"
            width={1200}
            height={675}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="size-6 text-primary" />
              </div>
              <CardTitle>Ingredientes Selecionados</CardTitle>
              <CardDescription>
                Utilizamos apenas ingredientes frescos e naturais, cuidadosamente selecionados para garantir o sabor
                autêntico e a qualidade superior em cada doce. Sem aditivos artificiais.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="size-6 text-primary" />
              </div>
              <CardTitle>Processo Artesanal</CardTitle>
              <CardDescription>
                Nossas receitas são passadas de geração em geração, preservando o modo artesanal de preparo que
                confere um sabor caseiro e inesquecível, cheio de carinho e história.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="size-6 text-primary" />
              </div>
              <CardTitle>Compromisso com a Excelência</CardTitle>
              <CardDescription>
                Com mais de duas décadas de experiência, somos referência na produção de doces artesanais,
                conquistando a confiança e o paladar de nossos clientes com excelência e dedicação.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="size-6 text-primary" />
              </div>
              <CardTitle>Variedade de Produtos</CardTitle>
              <CardDescription>
                Oferecemos uma ampla gama de bananadas e gomas de amido, com diferentes sabores e embalagens,
                perfeitas para todas as ocasiões e para agradar a todos os gostos.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}