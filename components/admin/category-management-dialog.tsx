"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface CategoryManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategoryChange: () => void // Callback para notificar sobre mudanças nas categorias
}

export function CategoryManagementDialog({ open, onOpenChange, onCategoryChange }: CategoryManagementDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      fetchCategories()
    } else {
      setEditingCategoryId(null)
      setEditingCategoryName("")
    }
  }, [open])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("[v0] Error fetching categories:", error)
      toast.error("Erro ao carregar categorias.")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (category: Category) => {
    setEditingCategoryId(category.id)
    setEditingCategoryName(category.name)
  }

  const handleSaveEdit = async (id: string) => {
    if (!editingCategoryName.trim()) {
      toast.error("O nome da categoria não pode ser vazio.")
      return
    }
    setIsSaving(true)
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingCategoryName.trim() }),
      })

      if (!response.ok) throw new Error("Failed to update category")

      toast.success("Categoria atualizada com sucesso!")
      setEditingCategoryId(null)
      setEditingCategoryName("")
      fetchCategories()
      onCategoryChange() // Notifica o ProductForm para atualizar suas categorias
    } catch (error) {
      console.error("[v0] Error updating category:", error)
      toast.error("Erro ao atualizar categoria.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.")) {
      return
    }
    setIsDeleting(id)
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete category")

      toast.success("Categoria excluída com sucesso!")
      fetchCategories()
      onCategoryChange() // Notifica o ProductForm para atualizar suas categorias
    } catch (error) {
      console.error("[v0] Error deleting category:", error)
      toast.error("Erro ao excluir categoria. Verifique se não há produtos associados.")
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar Categorias</DialogTitle>
          <DialogDescription>Edite ou exclua categorias existentes.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-600">Carregando categorias...</span>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {categories.length === 0 ? (
              <p className="text-center text-muted-foreground">Nenhuma categoria encontrada.</p>
            ) : (
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id} className="flex items-center gap-2">
                    {editingCategoryId === category.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleSaveEdit(category.id)
                            }
                          }}
                          disabled={isSaving}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleSaveEdit(category.id)}
                          disabled={isSaving}
                        >
                          {isSaving ? <Loader2 className="size-4 animate-spin" /> : "Salvar"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCategoryId(null)}
                          disabled={isSaving}
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1 text-sm">{category.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleEditClick(category)}
                          title="Editar categoria"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={isDeleting === category.id}
                          title="Excluir categoria"
                        >
                          {isDeleting === category.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}