import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload, PlanType } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      planType: user.planType
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        planType: user.planType
      },
      token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, name: string) {
    // Verificar se o usuário já existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    // Criar novo usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      email,
      passwordHash: hashedPassword,
      name,
      planId: PlanType.FREE
    });

    // Retornar usuário sem senha e com token
    const { passwordHash: _, ...result } = newUser;
    const payload: JwtPayload = {
      sub: newUser.id,
      email: newUser.email,
      name: newUser.name,
      planType: PlanType.FREE
    };

    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  hasPermission(user: User | JwtPayload, requiredPlan: PlanType): boolean {
    const userPlan = 'planType' in user ? (user as JwtPayload).planType : (user as User).name;

    // Hierarquia de planos
    const planHierarchy = {
      [PlanType.FREE]: 0,
      [PlanType.BASIC]: 1,
      [PlanType.ADVANCED]: 2,
      [PlanType.PREMIUM]: 3,
    };

    return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
  }
/*
  hasActiveSubscription(user: User | JwtPayload): boolean {
    if ('sub' in user) {
      // É um JwtPayload, precisamos buscar a assinatura no banco
      // Isso seria implementado em um cenário real
      return true; // Simplificação para exemplo
    }

    // É um User, verificar diretamente
    return !!user. && user.subscriptions.status === 'ACTIVE';
  }
 */
  async logout(): Promise<void>{
    //This function will do nothing.
  }
}
