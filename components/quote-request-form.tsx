"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const quoteSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().optional(),
  product_type: z.string().min(1, "Selecione um tipo de produto"),
  quantity: z.string().min(1, "Informe a quantidade desejada"),
  delivery_city: z.string().min(2, "Informe a cidade de entrega"),
  delivery_state: z.string().min(2, "Informe o estado"),
  additional_info: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProductType, setSelectedProductType] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Erro ao enviar solicitação")

      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.")
      reset()
      setSelectedProductType("")
    } catch (error) {
      toast.error("Erro ao enviar solicitação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Dados de Contato</h3>

        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input id="name" placeholder="Seu nome" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input id="phone" placeholder="(22) 99999-9999" {...register("phone")} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa (opcional)</Label>
          <Input id="company" placeholder="Nome da empresa" {...register("company")} />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-semibold text-lg">Informações do Produto</h3>

        <div className="space-y-2">
          <Label htmlFor="product_type">Tipo de Produto *</Label>
          <Select
            value={selectedProductType}
            onValueChange={(value) => {
              setSelectedProductType(value)
              setValue("product_type", value)
            }}
          >
            <SelectTrigger id="product_type" aria-invalid={!!errors.product_type}>
              <SelectValue placeholder="Selecione o tipo de produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bananada_tradicional">Bananada Tradicional</SelectItem>
              <SelectItem value="bananada_coco">Bananada com Coco</SelectItem>
              <SelectItem value="goma_sortida">Goma de Amido Sortida</SelectItem>
              <SelectItem value="goma_morango">Goma de Amido - Morango</SelectItem>
              <SelectItem value="goma_laranja">Goma de Amido - Laranja</SelectItem>
              <SelectItem value="mix_produtos">Mix de Produtos</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
          {errors.product_type && <p className="text-sm text-destructive">{errors.product_type.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade Desejada *</Label>
          <Input
            id="quantity"
            placeholder="Ex: 100 unidades, 50kg, 10 caixas..."
            {...register("quantity")}
            aria-invalid={!!errors.quantity}
          />
          {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message}</p>}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-semibold text-lg">Informações de Entrega</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="delivery_city">Cidade *</Label>
            <Input
              id="delivery_city"
              placeholder="Cidade de entrega"
              {...register("delivery_city")}
              aria-invalid={!!errors.delivery_city}
            />
            {errors.delivery_city && <p className="text-sm text-destructive">{errors.delivery_city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_state">Estado *</Label>
            <Input
              id="delivery_state"
              placeholder="UF"
              maxLength={2}
              {...register("delivery_state")}
              aria-invalid={!!errors.delivery_state}
            />
            {errors.delivery_state && <p className="text-sm text-destructive">{errors.delivery_state.message}</p>}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-2 pt-6 border-t">
        <Label htmlFor="additional_info">Informações Adicionais (opcional)</Label>
        <Textarea
          id="additional_info"
          placeholder="Alguma observação ou requisito especial para o seu pedido?"
          rows={4}
          {...register("additional_info")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Enviando...
          </>
        ) : (
          "Solicitar Orçamento"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Campos obrigatórios. Ao enviar, você concorda em receber contato da nossa equipe.
      </p>
    </form>
  )
}
