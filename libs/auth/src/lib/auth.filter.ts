
  /**
   * Filtro de autenticação para roteamento do cliente
   */
  import { AuthService } from './auth.service';
  import { JwtPayload, PlanType, RouteAccess, RouteConfig, UserSession } from './types';

  /**
   * Filtro de autenticação para roteamento do cliente
   */
  export class AuthFilter {
    constructor(
      private authService: AuthService,
      private routes: RouteConfig[]
    ) {}

    /**
     * Verifica se o usuário pode acessar a rota com base em seu plano e assinatura
     */
    canAccessRoute(path: string, session?: UserSession | JwtPayload | null): boolean {
      const route = this.findMatchingRoute(path);

      // Rota pública - sem restrições
      if (route.access === RouteAccess.PUBLIC) {
        return true;
      }

      // Rota autenticada - requer sessão
      if (!session) {
        return false;
      }

      // Rota baseada em plano - verifica plano e assinatura
      if (route.access === RouteAccess.PLAN_BASED) {
        if (route.requiredPlan && !this.authService.hasPermission(session, route.requiredPlan)) {
          return false;
        }

        if (route.requireActiveSubscription && !this.authService.hasActiveSubscription(session)) {
          return false;
        }
      }

      return true;
    }

    /**
     * Encontra a configuração de rota que corresponde ao caminho
     */
    private findMatchingRoute(path: string): RouteConfig {
      // Procura por correspondência exata ou por padrão
      const route = this.routes.find(r => {
        if (r.path === path) return true;
        if (r.path.endsWith('*') && path.startsWith(r.path.slice(0, -1))) return true;
        return false;
      });

      // Rota padrão é pública se não encontrada
      return route || { path, access: RouteAccess.PUBLIC };
    }

    /**
     * Obtém a rota de redirecionamento para acesso não autorizado
     */
    getRedirectPath(userPlan?: PlanType): string {
      if (!userPlan) {
        return '/auth/login';
      }

      switch (userPlan) {
        case PlanType.FREE:
          return '/freemium/dashboard';
        case PlanType.BASIC:
        case PlanType.ADVANCED:
        case PlanType.PREMIUM:
          return '/paid/dashboard';
        default:
          return '/';
      }
    }
}
