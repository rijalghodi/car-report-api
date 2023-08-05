import { NestMiddleware, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user.entity';

/**
 * This declaration is used to tell typescript globally that in the module Express,
 * the interface Request may have a property currentUser that has a type User or
 * undefined
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
// Injectable because we want to use UsersService
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session?.userId;

    if (userId) {
      const user = await this.usersService.findOne(userId);

      req.currentUser = user;
    }

    next();
  }
}
