import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Book from './book.entity';

@Entity()
class Author {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public secondName: string;

  @OneToMany(() => Book, (book: Book) => book.author)
  public books: Book[];
}

export default Author;
