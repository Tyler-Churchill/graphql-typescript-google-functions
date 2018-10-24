import { PrimaryGeneratedColumn } from 'typeorm';
import { validate } from 'class-validator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  async validate() {
    // call on entitiy instance to return errors or [] if validation passes
    return validate(this);
  }
}
