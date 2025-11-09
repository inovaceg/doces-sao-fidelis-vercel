"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ProductForm } from "@/components/admin/product-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const { data } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (!data) {
      router.push("/admin/products")
      return
    }

    setProduct(data)
    setLoading(false)
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
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#ff8800] mb-6"
        >
          <ArrowLeft className="size-4" />
          Voltar para produtos
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-[#4a4a4a] mb-6">Editar Produto</h2>
          <ProductForm product={product} />
        </div>
      </div>
    </main>
  )
}
