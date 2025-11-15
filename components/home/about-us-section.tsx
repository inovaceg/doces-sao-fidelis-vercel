import Link from "next/link";
import { Button } from "@/components/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export function AboutUsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-foreground">Nossa História e Missão</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A Doces São Fidelis nasceu em outubro de 2000, movida por um sonho: levar doces artesanais de qualidade a todo o Brasil. Após duas décadas de experiência no setor, Roberto Porto, apaixonado pelas tradicionais mariolas desde sua infância, percebeu que havia uma lacuna no mercado: a falta de uma bananada que combinasse qualidade superior, sabor autêntico a cada mordida e um custo acessível. Com isso, decidiu investir todas as suas economias em um novo empreendimento. O início foi em uma pequena cozinha no bairro Nova Divinéia, em São Fidélis/RJ, com uma equipe reduzida, focada na produção do nosso principal produto: a bananada.
          </p>
          <Button asChild size="lg">
            <Link href="/nossa-historia">
              Saiba mais sobre nossa jornada <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}