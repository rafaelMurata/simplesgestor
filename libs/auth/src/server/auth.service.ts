 import * as jwt from 'jsonwebtoken';
  import { AuthConfig, JwtPayload, TokenResponse, UserSession } from '../shared/types';
 import { PlanType, SubscriptionStatus }  from '../../../shared-models';

 export class AuthService {
    private config: AuthConfig;

    constructor(config: AuthConfig) {
      this.config = {
        jwtSecret: config.jwtSecret,
        expiresIn: config.expiresIn || '1h',
        cookieName: config.cookieName || 'auth_token',
        refreshTokenExpiresIn: config.refreshTokenExpiresIn || '7d'
      };
    }

    generateTokens(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenResponse {
      // Preparar payload base
      const basePayload = {
        sub: payload.sub,
        email: payload.email,
        planId: payload.planId,
        planType: payload.planType
      };

      if (payload.subscriptionStatus) {
        Object.assign(basePayload, { subscriptionStatus: payload.subscriptionStatus });
      }

      // Gerar access token usando callback para evitar problemas de tipo
      let accessToken = '';
      try {
        accessToken = jwt.sign(
          basePayload,
          this.config.jwtSecret
        );
      } catch (error) {
        console.error('Erro ao gerar access token:', error);
        throw new Error('Falha ao gerar token de acesso');
      }

      // Gerar refresh token se estiver configurado
      let refreshToken = '';
      if (this.config.refreshTokenExpiresIn) {
        try {
          refreshToken = jwt.sign(
            basePayload,
            this.config.jwtSecret
          );
        } catch (error) {
          console.error('Erro ao gerar refresh token:', error);
        }
      }

      // Calcular expiresIn em segundos
      let expiresIn = 3600; // padrão 1 hora
      if (typeof this.config.expiresIn === 'string') {
        if (this.config.expiresIn.includes('h')) {
          expiresIn = parseInt(this.config.expiresIn) * 3600;
        } else if (this.config.expiresIn.includes('m')) {
          expiresIn = parseInt(this.config.expiresIn) * 60;
        } else if (this.config.expiresIn.includes('d')) {
          expiresIn = parseInt(this.config.expiresIn) * 86400;
        } else {
          expiresIn = parseInt(this.config.expiresIn);
        }
      } else if (typeof this.config.expiresIn === 'number') {
        expiresIn = this.config.expiresIn;
      }

      return {
        accessToken,
        refreshToken: refreshToken || undefined,
        expiresIn
      };
    }

    verifyToken(token: string): JwtPayload | null {
      try {
        return jwt.verify(token, this.config.jwtSecret) as JwtPayload;
      } catch (error) {
        return null;
      }
    }

    hasPermission(session: UserSession | JwtPayload, requiredPlan: PlanType): boolean {
      const planType = 'planType' in session
        ? session.planType
        : session.plan?.name;

      if (!planType) return false;

      const planOrder = {
        [PlanType.FREE]: 0,
        [PlanType.BASIC]: 1,
        [PlanType.ADVANCED]: 2,
        [PlanType.PREMIUM]: 3
      };

      return planOrder[planType] >= planOrder[requiredPlan];
    }

    hasActiveSubscription(session: UserSession | JwtPayload): boolean {
      if ('subscriptionStatus' in session) {
        return session.subscriptionStatus === SubscriptionStatus.ACTIVE;
      }

      if ('subscription' in session && session.subscription) {
        return session.subscription.status === SubscriptionStatus.ACTIVE;
      }

      return false;
    }
  }
