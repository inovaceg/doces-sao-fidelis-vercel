"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, Package, FileText, MessageSquare, Mail, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/products", icon: Package },
  { name: "Orçamentos", href: "/admin/quotes", icon: FileText },
  { name: "Contatos", href: "/admin/messages", icon: MessageSquare },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="w-64 bg-[#e8e3dc] flex flex-col border-r border-[#d4cfc7]">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#d4cfc7]">
        <div className="flex items-center gap-3">
          <div className="relative size-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sem%20nome%20%281%29%20%281%29-vqBz106SPSsejO2YFogjWyruHk8EV4.png"
              alt="Doces São Fidélis"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-[#4a4a4a] text-sm">Admin Doces SF</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-[#2d2d2d] shadow-sm"
                      : "text-[#6b6b6b] hover:bg-[#ddd8d0] hover:text-[#2d2d2d]",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#d4cfc7]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4a4a4a] text-white rounded-lg text-sm font-medium hover:bg-[#3a3a3a] transition-colors"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </div>
    </div>
  )
}
