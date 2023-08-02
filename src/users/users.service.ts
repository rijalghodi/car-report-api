import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // To use Repository provided by typeorm, use this pattern
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create an instance of class User
    const user = this.repo.create({ email, password });
    // Save in database
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attr: Partial<User>) {
    // Partial: at least one of property User exist in abbr
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // Object.assign = replace user property by provided attr property
    Object.assign(user, attr);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
    // return user;
  }
}
