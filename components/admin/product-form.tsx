"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  category: z.enum(["bananada", "goma"], {
    required_error: "Selecione uma categoria",
  }),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  ingredients: z.string().optional(),
  weight: z.string().optional(),
  price: z.number().min(0, "Preço deve ser maior que zero").optional().nullable(),
  image_url: z.string().url("URL inválida").optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
})

type ProductFormData = z.infer<typeof productSchema>

type ProductFormProps = {
  product?: ProductFormData & { id: string }
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      is_featured: false,
      category: "bananada",
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)

    try {
      if (product?.id) {
        // Update existing product
        const { error } = await supabase.from("products").update(data).eq("id", product.id)

        if (error) throw error
        toast.success("Produto atualizado com sucesso!")
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([data])

        if (error) throw error
        toast.success("Produto criado com sucesso!")
      }

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving product:", error)
      toast.error("Erro ao salvar produto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto *</Label>
        <Input id="name" placeholder="Bananada Tradicional" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria *</Label>
        <select
          id="category"
          {...register("category")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
        >
          <option value="bananada">Bananada</option>
          <option value="goma">Goma de Amido</option>
        </select>
        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          placeholder="Descrição detalhada do produto..."
          rows={4}
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ingredients">Ingredientes</Label>
        <Textarea
          id="ingredients"
          placeholder="Lista de ingredientes..."
          rows={3}
          {...register("ingredients")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Peso/Tamanho</Label>
          <Input id="weight" placeholder="Ex: 500g, 1kg" {...register("weight")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="14.90"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">URL da Imagem</Label>
        <Input
          id="image_url"
          type="url"
          placeholder="https://example.com/image.jpg"
          {...register("image_url")}
          aria-invalid={!!errors.image_url}
        />
        {errors.image_url && <p className="text-sm text-red-600">{errors.image_url.message}</p>}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-[#ff8800] text-white rounded-lg hover:bg-[#e67700] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Salvando...
            </>
          ) : product ? (
            "Atualizar Produto"
          ) : (
            "Criar Produto"
          )}
        </button>
      </div>
    </form>
  )
}
