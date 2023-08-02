import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // This is called after insert user
  @AfterInsert()
  logInsert() {
    console.log('Successfully insert user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Successfully insert user with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Successfully remove user with id', this.id);
  }
}
