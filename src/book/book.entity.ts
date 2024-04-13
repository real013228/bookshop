import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genre from '../genre/genre.entity';
import Author from '../author/author.entity';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @ManyToOne(() => Author, (author: Author) => author.books, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'authorId' })
  public author: Author;

  @Column()
  public price: number;

  @Column()
  public authorId: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  public genres: Genre[];
}

export default Book;
