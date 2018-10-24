import * as bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { BaseEntity } from '../../BaseEntity';

import { Entity, Column, BeforeInsert } from 'typeorm';

export enum USER_STATUS_MAP {
  ACTIVE = 'USER_ACTIVE',
  BANNED = 'USER_BANNED',
  CLEANED = 'USER_CLEANED', // cleaned for GDPR "forgotten"
  IN_REVIEW = 'USER_UNDER_REVIEW'
}

export enum USER_PERMISSION_MAP {
  PUBLIC = 'PERM_PUBLIC',
  ADMIN = 'PERM_ADMIN'
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  @MinLength(5)
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', default: USER_STATUS_MAP.ACTIVE })
  status: USER_STATUS_MAP;

  @Column({
    type: 'enum',
    enum: USER_PERMISSION_MAP,
    array: true
  })
  permissions: USER_PERMISSION_MAP[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 11);
  }
}
