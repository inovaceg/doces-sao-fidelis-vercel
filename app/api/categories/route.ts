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
