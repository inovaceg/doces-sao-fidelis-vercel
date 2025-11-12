import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("[API Contact] Incoming request data:", data); // Log de entrada para depuração

    const supabase = await createClient()

    // Extrair e preparar os dados, garantindo que campos NOT NULL sejam strings
    // e campos NULLABLE sejam null se vazios
    const payload = {
      company_name: (data.companyName && data.companyName.trim() !== '') ? data.companyName.trim() : null,
      contact_name: data.contactName ? data.contactName.trim() : '', // NOT NULL: Garante string, mesmo que vazia
      email: data.email ? data.email.trim() : '',                   // NOT NULL: Garante string, mesmo que vazia
      phone: data.phone ? data.phone.trim() : '',                   // NOT NULL: Garante string, mesmo que vazia
      address: (data.address && data.address.trim() !== '') ? data.address.trim() : null,
      city: (data.city && data.city.trim() !== '') ? data.city.trim() : null,
      state: (data.state && data.state.trim() !== '') ? data.state.trim() : null,
      product_interest: null, // Este campo é sempre null para o formulário de contato
      quantity: null,         // Este campo é sempre null para o formulário de contato
      message: (data.message && data.message.trim() !== '') ? data.message.trim() : null, // Alterado para enviar null se vazio
    };

    console.log("[API Contact] Payload being sent to Supabase:", payload); // Log do payload para depuração

    const { error } = await supabase.from("quote_requests").insert([payload])

    if (error) {
      console.error("[API Contact] Error saving contact message to Supabase:", error);
      return NextResponse.json({ error: error.message || "Erro ao salvar mensagem de contato" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) { // Explicitly type error as any for easier access to message
    console.error("[API Contact] Unexpected error in contact API:", error)
    return NextResponse.json({ error: error.message || "Erro ao processar solicitação" }, { status: 500 })
  }
}