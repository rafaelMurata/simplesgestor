import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Usa 'email' como o campo de nome de usuário
      passwordField: 'password', // Usa 'password' como o campo de senha
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}