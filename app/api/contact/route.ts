import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    ])

    if (error) {
      console.error("Error saving contact message:", error)
      return NextResponse.json({ error: "Erro ao salvar mensagem" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact API:", error)
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 })
  }
}
