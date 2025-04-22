import { PlanType, User, Plan, Subscription } from '../../../shared-models';

/**
 * Dados da sessão do usuário
 */
export interface UserSession {
  user: User;
  plan: Plan;
  subscription?: Subscription;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

/**
 * Payload do token JWT
 */
export interface JwtPayload {
  sub: string;
  email: string;
  planId: string;
  planType: PlanType;
  subscriptionStatus?: string;
  iat: number;
  exp: number;
}

/**
 * Resposta contendo tokens de autenticação
 */
export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Configuração do serviço de autenticação
 */
export interface AuthConfig {
  jwtSecret: string;
  expiresIn: string | number;
  cookieName?: string;
  refreshTokenExpiresIn?: string | number;
}


/**
 * Tipos de acesso para as rotas
 */
export enum RouteAccess {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated',
  PLAN_BASED = 'plan_based'
}

/**
 * Configuração de rota para controle de acesso
 */
export interface RouteConfig {
  path: string;
  access: RouteAccess;
  requiredPlan?: PlanType;
  requireActiveSubscription?: boolean;
}
