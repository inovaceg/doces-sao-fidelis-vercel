import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Categories fetch error:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { name } = await request.json()

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: name.trim() }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Category creation error:", error)
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const { name } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID da categoria é obrigatório" }, { status: 400 })
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("categories")
      .update({ name: name.trim() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Category update error:", error)
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID da categoria é obrigatório" }, { status: 400 })
    }

    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (error) {
      // Handle foreign key constraint error specifically
      if (error.code === '23503') { // PostgreSQL foreign key violation error code
        return NextResponse.json({ error: "Não é possível excluir a categoria, pois há produtos associados a ela." }, { status: 409 });
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Category deletion error:", error)
    return NextResponse.json({ error: "Erro ao excluir categoria" }, { status: 500 })
  }
}