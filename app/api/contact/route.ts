import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("[API Contact] Incoming request data:", data); // Log de entrada para depuração

    const supabase = await createClient()

    // Extrair e preparar os dados, convertendo strings vazias para null para campos opcionais
    // E garantindo que campos NOT NULL sejam sempre strings (mesmo que vazias, se não preenchidas)
    const payload = {
      company_name: data.companyName || null,
      contact_name: data.contactName || "", // Garante que não é null
      email: data.email || "",             // Garante que não é null
      phone: data.phone || "",             // Garante que não é null
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      product_interest: null,
      quantity: null,
      message: data.message || "",         // Garante que não é null
    };

    console.log("[API Contact] Payload being sent to Supabase:", payload); // Log do payload para depuração

    const { error } = await supabase.from("quote_requests").insert([payload])

    if (error) {
      console.error("[API Contact] Error saving contact message to Supabase:", error);
      return NextResponse.json({ error: error.message || "Erro ao salvar mensagem de contato" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[API Contact] Unexpected error in contact API:", error)
    return NextResponse.json({ error: error.message || "Erro ao processar solicitação" }, { status: 500 })
  }
}