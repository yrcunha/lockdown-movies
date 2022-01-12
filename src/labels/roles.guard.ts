import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<boolean>('isAdmin', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (roles === user.isAdmin) {
      return true;
    } else {
      throw new UnauthorizedException(`unauthorized user`);
    }
  }
}
