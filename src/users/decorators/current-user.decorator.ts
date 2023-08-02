import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    /**
     * data: any | first argument adalah x dalam @CurrentUser(x).
     *
     * ctx : ExecutionContext | ctx adalah request clinet.
     * Sementara ExecutionContext adalah tipe data umum utk
     * seluruh Request client,  baik REST, GraphQL, web socket, dll.
     */

    // Extract request from request
    const request = ctx.switchToHttp().getRequest();

    return request.currentUser;
    /**
     * currentUser pada request.currentUser dibentuk oleh CurrentUserInterceptor
     * (buka /users/interceptors/current-user.interceptor.ts) yang dipasang
     * pada level routing.
     *
     * CurrentInterceptor memiliki akses kepada
     * Request Object sehingga bisa mendapatkan session. Juga
     * memiliki akses kepada DI (Dependency Injector) Container sehingga
     * bisa menggunakan findOne dari UsersService. Dengan kombinasi session dan
     * findOne dia bisa mendapatkan user dan melampirkannya tsb
     * ke dalam Request Object yang dilempar ke sini
     */
  },
);
