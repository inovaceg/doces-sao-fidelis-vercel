import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      throw error
    }

    const nextDisplayOrder = (data?.display_order || 0) + 1
    return NextResponse.json({ nextDisplayOrder })
  } catch (error) {
    console.error("[v0] Error fetching next display order:", error)
    return NextResponse.json({ error: "Erro ao obter a próxima ordem de exibição" }, { status: 500 })
  }
}