import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Order from './order.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public secondName: string;

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[];
}

export default User;
