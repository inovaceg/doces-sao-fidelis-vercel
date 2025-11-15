import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { NewsletterForm } from "@/components/newsletter-form";

export function ContactNewsletterSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Card "Entre em Contato" */}
          <div>
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-serif text-3xl lg:text-5xl font-bold">Entre em Contato</h2>
                    <p className="text-primary-foreground/90">
                      Tem alguma dúvida ou quer fazer um pedido? Envie uma mensagem e entraremos em contato em breve.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24" id="newsletter-section">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold">Receba Nossas Novidades</h3>
                    <p className="text-primary-foreground/90">
                      Cadastre-se em nossa newsletter e fique por dentro de promoções, novos produtos e receitas
                      exclusivas!
                    </p>
                  </div>
                  <NewsletterForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}