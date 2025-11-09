"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  category: string
  description: string
  ingredients?: string
  weight?: string
  price?: number
  image_url?: string
  is_featured?: boolean
  created_at: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm("Deseja realmente excluir este produto?")) return

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      toast.error("Erro ao excluir produto")
    } else {
      fetchProducts()
      toast.success("Produto excluído")
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center py-12">Carregando...</div>
      </main>
    )
  }

  return (
    <main className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#4a4a4a]">Gestão de Produtos</h2>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#ff8800] text-white rounded-lg hover:bg-[#e67700] transition-colors"
          >
            <Plus className="size-4" />
            Adicionar Novo Produto
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ativo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative size-12 bg-gray-100 rounded overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center size-full text-gray-400 text-xs">
                          Sem imagem
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#4a4a4a] font-medium">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4a4a4a] capitalize">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4a4a4a]">
                    {product.price ? `R$ ${product.price.toFixed(2)}` : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4a4a4a]">{product.weight || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Sim</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-gray-600 hover:text-[#ff8800]"
                        title="Editar"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-gray-600 hover:text-red-600"
                        title="Excluir"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && <div className="text-center py-12 text-gray-500">Nenhum produto cadastrado</div>}
        </div>
      </div>
    </main>
  )
}
