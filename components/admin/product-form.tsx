"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2, Upload, Plus, Pencil, X } from "lucide-react"
import { ImageCropDialog } from "./image-crop-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  weight: z.string().optional(),
  price: z.number().min(0, "Preço deve ser maior que zero").optional().nullable(),
  image_url: z.string().optional().or(z.literal("")),
})

type ProductFormData = z.infer<typeof productSchema>

type ProductFormProps = {
  product?: ProductFormData & { id: string }
}

type Category = {
  id: string
  name: string
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(product?.image_url || "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      category: "",
    },
  })

  const watchedImageUrl = watch("image_url")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("[v0] Error fetching categories:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB")
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setTempImageUrl(url)
    setCropDialogOpen(true)
  }

  const handleCropComplete = async (croppedBlob: Blob) => {
    setIsUploading(true)
    try {
      const file = new File([croppedBlob], selectedFile?.name || "product.jpg", { type: "image/jpeg" })
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const { url } = await response.json()
      setImagePreview(url)
      setValue("image_url", url)
      toast.success("Imagem carregada com sucesso!")
    } catch (error) {
      console.error("[v0] Upload error:", error)
      toast.error("Erro ao fazer upload da imagem")
    } finally {
      setIsUploading(false)
      if (tempImageUrl) URL.revokeObjectURL(tempImageUrl)
    }
  }

  const handleEditImage = () => {
    if (imagePreview) {
      setTempImageUrl(imagePreview)
      setCropDialogOpen(true)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    setValue("image_url", "")
    setSelectedFile(null)
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Digite um nome para a categoria")
      return
    }

    setIsCreatingCategory(true)
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      })

      if (!response.ok) throw new Error("Failed to create category")

      const newCategory = await response.json()
      setCategories([...categories, newCategory])
      setValue("category", newCategory.id)
      setNewCategoryName("")
      setCategoryDialogOpen(false)
      toast.success("Categoria criada com sucesso!")
    } catch (error) {
      console.error("[v0] Error creating category:", error)
      toast.error("Erro ao criar categoria")
    } finally {
      setIsCreatingCategory(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)

    try {
      const selectedCategory = categories.find((cat) => cat.id === data.category)
      const categoryName = selectedCategory?.name || data.category

      const productData = {
        ...data,
        category: categoryName, // Submit category name instead of UUID
      }

      console.log("[v0] Submitting product data:", productData)

      if (product?.id) {
        const { error } = await supabase.from("products").update(productData).eq("id", product.id)
        if (error) throw error
        console.log("[v0] Product updated successfully")
        toast.success("Produto atualizado com sucesso!")
      } else {
        const { error } = await supabase.from("products").insert([productData])
        if (error) throw error
        console.log("[v0] Product created successfully")
        toast.success("Produto criado com sucesso!")
      }

      console.log("[v0] Navigating to products list")
      window.location.href = "/admin/products"
    } catch (error) {
      console.error("[v0] Error saving product:", error)
      toast.error("Erro ao salvar produto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label>Imagem do Produto</Label>
          {imagePreview ? (
            <div className="relative w-full max-w-sm">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto rounded-lg border border-gray-300"
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleEditImage}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Editar imagem"
                >
                  <Pencil className="size-4 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Remover imagem"
                >
                  <X className="size-4 text-red-600" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {isUploading ? (
                  <>
                    <Loader2 className="size-8 text-gray-400 animate-spin" />
                    <p className="text-sm text-gray-600">Enviando imagem...</p>
                  </>
                ) : (
                  <>
                    <Upload className="size-8 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Clique para fazer upload ou arraste uma imagem
                      <br />
                      <span className="text-xs text-gray-500">PNG, JPG ou WEBP (máx. 5MB)</span>
                    </p>
                  </>
                )}
              </label>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto *</Label>
          <Input id="name" placeholder="Bananada Tradicional" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <div className="flex gap-2">
            <select
              id="category"
              {...register("category")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setCategoryDialogOpen(true)}
              title="Adicionar nova categoria"
            >
              <Plus className="size-4" />
            </Button>
          </div>
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

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageUrl={tempImageUrl}
        onCropComplete={handleCropComplete}
      />

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Categoria</DialogTitle>
            <DialogDescription>Crie uma nova categoria para organizar seus produtos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nome da Categoria</Label>
              <Input
                id="category-name"
                placeholder="Ex: Doces Especiais"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleCreateCategory()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleCreateCategory}
              disabled={isCreatingCategory || !newCategoryName.trim()}
              className="bg-[#ff8800] hover:bg-[#e67700]"
            >
              {isCreatingCategory ? (
                <>
                  <Loader2 className="animate-spin size-4 mr-2" />
                  Criando...
                </>
              ) : (
                "Criar Categoria"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
