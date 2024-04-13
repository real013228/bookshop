import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Book from '../book/book.entity';

@Entity()
class Author {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public secondName: string;

  @OneToMany(() => Book, (book: Book) => book.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public books?: Book[];
}

export default Author;
