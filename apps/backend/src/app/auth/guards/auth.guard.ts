import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      const token = authorization.replace('Bearer ', '');

      //TODO: add logic to validate token

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}