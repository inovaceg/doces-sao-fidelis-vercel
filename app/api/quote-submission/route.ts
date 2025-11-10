import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { formData, cartItems } = await request.json()
    const supabase = await createClient()

    // Inserir os dados do formulário de contato na tabela quote_requests
    const { data: quoteRequest, error: quoteError } = await supabase
      .from("quote_requests")
      .insert([
        {
          company_name: formData.companyName,
          contact_name: formData.fullName, // Usar fullName como contact_name
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.number}${formData.complement ? `, ${formData.complement}` : ''}`,
          city: formData.city,
          state: formData.state,
          // product_interest e quantity serão gerados a partir dos cartItems
          product_interest: cartItems.map((item: any) => `${item.name} (x${item.quantity})`).join('; '),
          quantity: cartItems.reduce((total: number, item: any) => total + item.quantity, 0).toString(), // Soma total das quantidades
          message: `Solicitação de orçamento para os seguintes produtos:\n${cartItems.map((item: any) => `- ${item.name} (x${item.quantity}${item.weight ? `, ${item.weight}` : ''}${item.units_per_package ? `, ${item.units_per_package} unidades/emb.` : ''})`).join('\n')}\n\nDetalhes adicionais do cliente:\nTipo de Documento: ${formData.documentType}\nNúmero do Documento: ${formData.documentNumber}\nCEP: ${formData.cep}\nBairro: ${formData.neighborhood}`,
        },
      ])
      .select()
      .single()

    if (quoteError) {
      console.error("Error saving quote request:", quoteError)
      return NextResponse.json({ error: "Erro ao salvar solicitação de orçamento" }, { status: 500 })
    }

    return NextResponse.json({ success: true, quoteRequestId: quoteRequest.id })
  } catch (error) {
    console.error("Error in quote submission API:", error)
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 })
  }
}