import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BooksEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  year: number;

  @Column()
  language: string;

  @Column()
  weight: number;

  @Column()
  length: number;

  @Column()
  width:number

  @Column()
  height: number
}