export enum PlanType {
  FREE = 'Free',
  BASIC = 'Basic',
  ADVANCED = 'Advanced',
  PREMIUM = 'Premium'
}

export interface User {
  id: string;
  email: string;
  planId: string;
}

export interface Plan {
  id: string;
  name: PlanType;
  price: number;
  features: any;
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'expired' | 'inactive';
  startDate?: Date;
  endDate?: Date;
  externalId?: string;
}

export interface UserSession {
  user: User;
  plan: Plan;
  subscription?: Subscription;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

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
