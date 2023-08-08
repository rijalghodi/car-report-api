import { Exclude } from 'class-transformer';
import { Report } from '../reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({ nullable: true })
  // name: string;

  // @Column({ nullable: true })
  // age: number;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;
  /**
   * This property for permission to edit report approval
   */

  @OneToMany(() => Report, (report) => report.user)
  /**
   * The first argument in OneToMany decorator diperlukan, karena antara
   * Report dan User memiliki circular dependency. Supaya tidak konflik,
   * jalan keluarnya adalah callback function
   *
   * Adapun argumen kedua digunakan untuk mendefinsikan hubungan antara
   * user dengan report
   */
  reports: Report[];

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
