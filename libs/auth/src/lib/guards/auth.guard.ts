import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { PlanType } from '../types';

/**
 * Guard de autenticação para proteger rotas NestJS
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se a rota é pública
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    const payload = this.authService.verifyToken(token);

    if (!payload) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    // Verifica requisitos de plano
    const requiredPlan = this.reflector.getAllAndOverride<PlanType>(
      'requiredPlan',
      [context.getHandler(), context.getClass()]
    );

    if (
      requiredPlan &&
      !this.authService.hasPermission(payload, requiredPlan)
    ) {
      throw new UnauthorizedException(
        'Seu plano não permite acesso a este recurso'
      );
    }

    // Verifica requisito de assinatura ativa
    const requireActiveSubscription = this.reflector.getAllAndOverride<boolean>(
      'requireActiveSubscription',
      [context.getHandler(), context.getClass()]
    );

    if (
      requireActiveSubscription &&
      !this.authService.hasActiveSubscription(payload)
    ) {
      throw new UnauthorizedException('Sua assinatura não está ativa');
    }

    // Define o usuário na requisição
    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return undefined;
    }
    return authorization.substring(7); // Remove 'Bearer ' do início
  }
}
