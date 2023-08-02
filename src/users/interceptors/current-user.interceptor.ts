import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    /**
     * Ini dijalankan sebelum request diterima
     *
     * Kita akan mengambil userId dalam request session
     * Kemudian kita akan mencari user pemilik userId tsb
     * dan melampirkannya ke dalam request object sebagai
     * currentUser.
     *
     */
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    // Lanjutkan proses selanjutnya
    return next.handle();
  }
}
