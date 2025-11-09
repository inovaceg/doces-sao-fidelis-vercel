import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/admin/login"
  const isRegisterPage = request.nextUrl.pathname === "/admin/register"

  if (isAdminRoute) {
    if (user) {
      // Se o usuário está autenticado e tentando acessar login/registro, redireciona para o dashboard
      if (isLoginPage || isRegisterPage) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      // Se autenticado e acessando outras rotas admin, permite
      return response
    } else {
      // Se o usuário NÃO está autenticado
      if (isLoginPage || isRegisterPage) {
        // Permite acesso às páginas de login/registro
        return response
      } else {
        // Redireciona usuários não autenticados de outras rotas admin para o login
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    }
  }

  // Para rotas que não são de administração, apenas retorna a resposta (a sessão pode ter sido atualizada)
  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}