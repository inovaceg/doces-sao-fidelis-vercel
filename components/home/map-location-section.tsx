import Link from "next/link";
import { Button } from "@/components/button";
import { MapEmbed } from "@/components/MapEmbed";
import { ArrowRight } from "lucide-react";
import React from "react";

export function MapLocationSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-center text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Visite Nossa Fábrica
          </h3>
          <p className="text-lg text-muted-foreground text-pretty mb-8">
            Estamos localizados em São Fidélis, RJ. Venha nos fazer uma visita e conhecer de perto a tradição e a qualidade dos nossos doces.
          </p>

          <MapEmbed lat={-21.637652323862493} lng={-41.732340334072234} zoom={15} />

          <div className="pt-6">
            <Button asChild size="lg">
              <Link href="/contato">
                <span>Entre em Contato para Visitas</span>
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}