import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Order from '../order/order.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[];
}

export default User;
