"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const newsletterSchema = z.object({
  name: z.string().min(2, "Nome completo deve ter no mínimo 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(14, "WhatsApp inválido (ex: 22-9-8888-8888)").max(14, "WhatsApp inválido (ex: 22-9-8888-8888)"), // Atualizado para 14 caracteres
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue, // Adicionado setValue para o mascaramento
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  // Função para mascarar o WhatsApp
  const handleWhatsappInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove todos os caracteres não numéricos
    let cleanedValue = value.replace(/\D/g, '');

    // Aplica a máscara: XX-X-XXXX-XXXX
    let formattedValue = '';
    if (cleanedValue.length > 0) {
      formattedValue = cleanedValue.substring(0, 2); // XX
      if (cleanedValue.length > 2) {
        formattedValue += '-' + cleanedValue.substring(2, 3); // X
      }
      if (cleanedValue.length > 3) {
        formattedValue += '-' + cleanedValue.substring(3, 7); // XXXX
      }
      if (cleanedValue.length > 7) {
        formattedValue += '-' + cleanedValue.substring(7, 11); // XXXX
      }
    }
    setValue('whatsapp', formattedValue, { shouldValidate: true });
  };

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Erro ao cadastrar")

      toast.success("Cadastro realizado com sucesso! Você receberá nossas novidades.")
      reset()
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="Seu nome completo *" {...register("name")} aria-invalid={!!errors.name} className="bg-white text-foreground" />
        {errors.name && <p className="text-sm text-red-200">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Seu e-mail *"
          {...register("email")}
          aria-invalid={!!errors.email}
          className="bg-white text-foreground"
        />
        {errors.email && <p className="text-sm text-red-200">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Seu WhatsApp (XX-X-XXXX-XXXX) *"
          {...register("whatsapp")}
          onChange={handleWhatsappInputChange} // Usando a função de mascaramento
          aria-invalid={!!errors.whatsapp}
          className="bg-white text-foreground"
          maxLength={14} // Definindo o comprimento máximo para o formato mascarado
        />
        {errors.whatsapp && <p className="text-sm text-red-200">{errors.whatsapp.message}</p>}
      </div>

      <div className="space-y-2">
        <Input placeholder="Sua cidade *" {...register("city")} aria-invalid={!!errors.city} className="bg-white text-foreground" />
        {errors.city && <p className="text-sm text-red-200">{errors.city.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Cadastrando...
          </>
        ) : (
          "Cadastrar"
        )}
      </Button>
    </form>
  )
}