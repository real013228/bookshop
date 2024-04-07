import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Book from '../book/book.entity';
import User from '../user/user.entity';

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => Book)
  @JoinTable()
  public books: Book[];

  @Column()
  public totalPrice: number;

  @ManyToOne(() => User, (user: User) => user.orders)
  public user: User;
}

export default Order;
