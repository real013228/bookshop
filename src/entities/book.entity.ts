import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Genre from './genre.entity.js';
import Author from '../author/author.entity';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @ManyToOne(() => Author, (author: Author) => author.books)
  public author: Author;

  @Column()
  public price: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  public genres: Genre[];
}

export default Book;
