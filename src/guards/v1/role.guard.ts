import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/types/v1/auth.types';
import { VerifiedRequestInterface } from 'src/types/v1/middleware.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<VerifiedRequestInterface>();

    const user = request.user;

    if (!user || !user?.role) {
      throw new ForbiddenException('Unauthorize Access. No User or Role found');
    }

    return requiredRoles.some((requiredRole) => {
      if (user.role === Role.ADMIN) {
        return true;
      }

      if (user.role === Role.STAFF) {
        return requiredRole === Role.STAFF || requiredRole === Role.USER;
      }

      if (user.role === Role.USER) {
        return requiredRole === Role.USER;
      }

      return false
    });

  }
}
