"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Importar RadioGroup
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useCart } from "@/components/cart-provider" // Importar useCart

// Esquema de validação para o formulário de checkout
const checkoutSchema = z.object({
  documentType: z.enum(["cpf", "cnpj"], { message: "Selecione o tipo de documento" }),
  documentNumber: z.string().min(11, "Documento inválido").max(18, "Documento inválido"),
  fullName: z.string().min(3, "Nome completo deve ter no mínimo 3 caracteres"),
  phone: z.string().min(10, "Telefone/WhatsApp inválido"),
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"), // 8 dígitos + hífen
  address: z.string().min(3, "Endereço inválido"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro inválido"),
  city: z.string().min(2, "Cidade inválida"),
  state: z.string().min(2, "Estado inválido").max(2, "Estado inválido"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      documentType: "cpf", // Valor padrão
    },
  })

  const watchedCep = watch("cep")
  const watchedDocumentType = watch("documentType")

  // Efeito para preencher o endereço automaticamente ao digitar o CEP
  useEffect(() => {
    const fetchAddress = async () => {
      if (watchedCep && watchedCep.length === 8) { // Apenas se o CEP tiver 8 dígitos (sem hífen)
        try {
          const response = await fetch(`https://viacep.com.br/ws/${watchedCep}/json/`)
          const data: ViaCepResponse = await response.json()

          if (!data.erro) {
            setValue("address", data.logradouro)
            setValue("neighborhood", data.bairro)
            setValue("city", data.localidade)
            setValue("state", data.uf)
            toast.success("Endereço preenchido automaticamente!")
          } else {
            toast.error("CEP não encontrado. Por favor, digite o endereço manualmente.")
            setValue("address", "")
            setValue("neighborhood", "")
            setValue("city", "")
            setValue("state", "")
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error)
          toast.error("Erro ao buscar CEP. Tente novamente.")
        }
      }
    }
    fetchAddress()
  }, [watchedCep, setValue])

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)

    if (cartItems.length === 0) {
      toast.error("Sua lista de orçamento está vazia. Adicione produtos antes de enviar a solicitação.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/quote-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data, cartItems }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar solicitação de orçamento");
      }

      toast.success("Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.")
      clearCart() // Limpa o carrinho após a finalização
      reset() // Limpa o formulário
      // Redirecionar para uma página de confirmação ou home
    } catch (error: any) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error(error.message || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Tipo de Documento</Label>
        <RadioGroup
          onValueChange={(value) => setValue("documentType", value as "cpf" | "cnpj")}
          defaultValue="cpf"
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cpf" id="cpf" />
            <Label htmlFor="cpf">CPF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cnpj" id="cnpj" />
            <Label htmlFor="cnpj">CNPJ</Label>
          </div>
        </RadioGroup>
        {errors.documentType && <p className="text-sm text-destructive">{errors.documentType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentNumber">{watchedDocumentType === "cpf" ? "CPF" : "CNPJ"} *</Label>
        <Input
          id="documentNumber"
          placeholder={watchedDocumentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
          {...register("documentNumber")}
          aria-invalid={!!errors.documentNumber}
        />
        {errors.documentNumber && <p className="text-sm text-destructive">{errors.documentNumber.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Nome Completo *</Label>
        <Input id="fullName" placeholder="Seu nome completo" {...register("fullName")} aria-invalid={!!errors.fullName} />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone / WhatsApp *</Label>
        <Input id="phone" placeholder="(XX) XXXXX-XXXX" {...register("phone")} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep">CEP *</Label>
        <Input id="cep" placeholder="00000-000" {...register("cep")} aria-invalid={!!errors.cep} maxLength={9} />
        {errors.cep && <p className="text-sm text-destructive">{errors.cep.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço *</Label>
        <Input id="address" placeholder="Rua, Avenida, etc." {...register("address")} aria-invalid={!!errors.address} />
        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="number">Número *</Label>
          <Input id="number" placeholder="123" {...register("number")} aria-invalid={!!errors.number} />
          {errors.number && <p className="text-sm text-destructive">{errors.number.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement">Complemento (Opcional)</Label>
          <Input id="complement" placeholder="Apto 101, Bloco B" {...register("complement")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro *</Label>
        <Input id="neighborhood" placeholder="Seu bairro" {...register("neighborhood")} aria-invalid={!!errors.neighborhood} />
        {errors.neighborhood && <p className="text-sm text-destructive">{errors.neighborhood.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade *</Label>
          <Input id="city" placeholder="Sua cidade" {...register("city")} aria-invalid={!!errors.city} />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado (UF) *</Label>
          <Input id="state" placeholder="RJ" {...register("state")} aria-invalid={!!errors.state} maxLength={2} />
          {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Enviando Solicitação...
          </>
        ) : (
          "Confirmar Solicitação de Orçamento"
        )}
      </Button>
    </form>
  )
}