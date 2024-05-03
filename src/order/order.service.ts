import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateOrderDto } from './dto/update-order.dto';
import { createOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Order from './order.entity';
import Book from '../book/book.entity';
import User from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { orderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllOrders() {
    const orders = await this.ordersRepository.find({
      relations: ['user', 'books'],
    });
    return orders.map((order) => plainToClass(orderDto, order));
  }

  async findAllOrdersByUserEmail(email: string) {
    return await this.ordersRepository.find({
      where: {
        user: { email: email },
      },
      relations: ['books'], // Include 'books' to load the associated books
    });
  }

  async getOrderByID(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'books'],
    });
    if (order) {
      return plainToClass(orderDto, order);
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async createOrder(orderDTO: createOrderDto) {
    const user = await this.usersRepository.findOneBy({
      email: orderDTO.userId,
    });
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!orderDTO.bookIds || orderDTO.bookIds.length === 0) {
      throw new HttpException(
        'Books list cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    const books = await this.booksRepository.findBy({
      id: In(orderDTO.bookIds),
    });
    if (books.length !== orderDTO.bookIds.length) {
      throw new HttpException(
        'One or more books not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = new Order();
    order.user = user;
    order.books = books;
    order.totalPrice = books.reduce((sum, book) => sum + book.price, 0);
    await this.ordersRepository.save(order);
    return plainToClass(orderDto, order);
  }

  async updateOrder(orderId: number, orderDTO: updateOrderDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'books'],
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (orderDTO.bookIds && orderDTO.bookIds.length > 0) {
      const books = await this.booksRepository.findBy({
        id: In(orderDTO.bookIds),
      });
      if (books.length !== orderDTO.bookIds.length) {
        throw new HttpException(
          'One or more books not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      order.books = books;
    } else if (orderDTO.bookIds && orderDTO.bookIds.length === 0) {
      order.books = [];
    }

    order.totalPrice = order.books.reduce((sum, book) => sum + book.price, 0);
    await this.ordersRepository.save(order);
    return plainToClass(orderDto, order);
  }

  async deleteOrder(id: number) {
    const deleteResponse = await this.ordersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
