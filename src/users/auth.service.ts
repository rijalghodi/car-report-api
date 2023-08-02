import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 1. See if emial in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('user in use');
    }

    // 2. Hash user password

    // Generate salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 28)) as Buffer;

    // Join hash and salt
    const result = salt + '.' + hash.toString('hex');

    // 3. Create and save new user
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    // Find user
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // Evaluate the password
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 28)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password');
    }

    return user;
  }
}
