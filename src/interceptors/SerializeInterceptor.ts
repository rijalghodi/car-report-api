import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run before request accepted

    return handler.handle().pipe(
      map((data: any) => {
        // Run before response sent
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          //  excludeExtraneousValues: true, indicate that if
          // data has property that UserDto doesnt have, it will be removed
        });
      }),
    );
  }
}
