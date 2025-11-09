import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary" />
              <span className="font-serif text-lg font-bold text-foreground">Doces São Fidélis</span>
            </div>
            <p className="text-sm text-muted-foreground">Bananadas e gomas artesanais desde 2000</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/produtos" className="hover:text-foreground transition-colors">
                  Bananadas
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-foreground transition-colors">
                  Gomas de Amido
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-foreground transition-colors">
                  Produtos Especiais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/nossa-historia" className="hover:text-foreground transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/qualidade" className="hover:text-foreground transition-colors">
                  Qualidade
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>São Fidélis, RJ</li>
              <li>contato@docessaofidelis.com.br</li>
              <li>(22) 9999-9999</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Doces São Fidélis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
