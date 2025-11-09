import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <main className="p-8">
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-3xl font-bold text-[#4a4a4a] mb-4">Bem-vindo à Área Administrativa!</h2>
        <p className="text-[#6b6b6b]">Use o menu lateral para navegar e gerenciar o site.</p>
      </div>
    </main>
  )
}
