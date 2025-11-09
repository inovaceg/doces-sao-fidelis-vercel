import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow access to login page without authentication
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-[#f5f1ed]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b bg-white px-8 py-4">
          <h1 className="text-xl font-semibold text-[#4a4a4a]">Área Administrativa</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
