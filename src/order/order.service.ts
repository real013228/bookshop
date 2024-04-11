import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateOrderDto } from './dto/update-order.dto';
import { createOrderDto } from './dto/create-order.dto';
import OrderEntity from './order.entity';

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Hello World!';
  }
  private lastOrderID = 0;
  private orders: OrderEntity[] = [];

  getAllOrders() {
    return this.orders;
  }

  getOrderByID(id: number) {
    const order = this.orders.find((order) => order.id === id);
    if (order) {
      return order;
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  updateOrder(id: number, order: updateOrderDto) {
    console.log('replace order', id, order.totalPrice);
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  createOrder(order: createOrderDto) {
    const newOrder = {
      id: this.lastOrderID,
      totalPrice: order.totalPrice,
      books: order.books,
      user: order.user,
    };
    this.lastOrderID++;
    this.orders.push(newOrder);
    return newOrder;
  }

  deleteOrder(id: number) {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex > -1) {
      this.orders.splice(orderIndex, 1);
    } else {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
