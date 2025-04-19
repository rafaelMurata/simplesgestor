import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { AuthFilter, RouteAccess, AuthService, PlanType } from '@app/auth'

// Configuração de rotas com controle de acesso
const routeConfigs = [
  { path: '/auth/*', access: RouteAccess.PUBLIC },
  { path: '/', access: RouteAccess.PUBLIC },
  { path: '/freemium/*', access: RouteAccess.AUTHENTICATED },
  { path: '/paid/basic/*', access: RouteAccess.PLAN_BASED, requiredPlan: PlanType.BASIC, requireActiveSubscription: true },
  { path: '/paid/advanced/*', access: RouteAccess.PLAN_BASED, requiredPlan: PlanType.ADVANCED, requireActiveSubscription: true },
  { path: '/paid/premium/*', access: RouteAccess.PLAN_BASED, requiredPlan: PlanType.PREMIUM, requireActiveSubscription: true }
]

// Inicializar serviços de autenticação
const authService = new AuthService({
  jwtSecret: process.env.AUTH_SECRET || 'your-secret-key',
  expiresIn: '1h'
})

const authFilter = new AuthFilter(authService, routeConfigs)

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value
  const path = request.nextUrl.pathname
  
  // Verificar token JWT
  const session = authToken ? authService.verifyToken(authToken) : null
  
  // Se não tiver acesso à rota
  if (!authFilter.canAccessRoute(path, session)) {
    if (!session) {
      // Usuário não autenticado - redirecionar para login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    } else {
      // Usuário autenticado mas sem permissão - redirecionar para dashboard apropriado
      return NextResponse.redirect(new URL(
        authFilter.getRedirectPath(session.planType), 
        request.url
      ))
    }
  }

  // Redirecionar usuários autenticados tentando acessar páginas de login
  if (path.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL(
      authFilter.getRedirectPath(session.planType),
      request.url
    ))
  }

  return NextResponse.next()
}
