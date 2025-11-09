import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    const { error } = await supabase.from("quote_requests").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        product_type: data.product_type,
        quantity: data.quantity,
        delivery_city: data.delivery_city,
        delivery_state: data.delivery_state,
        additional_info: data.additional_info || null,
      },
    ])

    if (error) {
      console.error("Error saving quote request:", error)
      return NextResponse.json({ error: "Erro ao salvar solicitação" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in quote request API:", error)
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 })
  }
}
