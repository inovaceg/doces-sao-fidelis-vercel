"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area" // Importar ScrollArea
import { Label } from "@/components/ui/label"
import { formatPhoneNumber } from "@/lib/utils" // Importar a função de formatação

interface QuoteRequest {
  id: string
  company_name: string | null
  contact_name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  product_interest?: string
  quantity?: string
  message?: string
  created_at: string
}

interface QuoteDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quote: QuoteRequest | null
}

export function QuoteDetailsDialog({ open, onOpenChange, quote }: QuoteDetailsDialogProps) {
  if (!quote) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Detalhes da Solicitação de Orçamento</DialogTitle>
          <DialogDescription>
            Informações completas da solicitação enviada por {quote.contact_name}.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-4"> {/* Adicionado ScrollArea para conteúdo longo */}
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label className="font-semibold">Data da Solicitação:</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(quote.created_at).toLocaleString("pt-BR")}
              </p>
            </div>
            <div>
              <Label className="font-semibold">Contato:</Label>
              <p className="text-sm text-muted-foreground">{quote.contact_name}</p>
            </div>
            {quote.company_name && (
              <div>
                <Label className="font-semibold">Empresa:</Label>
                <p className="text-sm text-muted-foreground">{quote.company_name}</p>
              </div>
            )}
            <div>
              <Label className="font-semibold">E-mail:</Label>
              <p className="text-sm text-muted-foreground">{quote.email}</p>
            </div>
            <div>
              <Label className="font-semibold">Telefone:</Label>
              <p className="text-sm text-muted-foreground">{formatPhoneNumber(quote.phone)}</p> {/* Aplicando a formatação aqui */}
            </div>
            {(quote.address || quote.city || quote.state) && (
              <div>
                <Label className="font-semibold">Endereço:</Label>
                <p className="text-sm text-muted-foreground">
                  {quote.address}{quote.address && (quote.city || quote.state) ? ", " : ""}
                  {quote.city}{quote.city && quote.state ? " - " : ""}
                  {quote.state}
                </p>
              </div>
            )}
            {quote.product_interest && (
              <div>
                <Label className="font-semibold">Produtos de Interesse:</Label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quote.product_interest}</p>
            </div>
            )}
            {quote.quantity && (
              <div>
                <Label className="font-semibold">Quantidade Total:</Label>
                <p className="text-sm text-muted-foreground">{quote.quantity}</p>
              </div>
            )}
            {quote.message && (
              <div>
                <Label className="font-semibold">Mensagem:</Label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quote.message}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}