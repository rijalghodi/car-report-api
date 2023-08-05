import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    if (!request.currentUser) {
      /**
       * request.currentUser is property added by CurrentUserInterceptor
       */
      return false;
    }

    return request.currentUser.admin;
  }
}
