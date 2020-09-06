import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Externalusers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  street1: string;

  @Column()
  street2: string;

  @Column()
  suburb: string;

  @Column()
  state: string;

  @Column()
  postcode: string

  @Column()
  email: string;

  @Column()
  password: string;
  
}
