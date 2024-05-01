import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateOrderDto } from './dto/update-order.dto';
import { createOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Order from './order.entity';
import Book from '../book/book.entity';
import User from '../user/user.entity';
import {plainToClass} from "class-transformer";
import {orderDto} from "./dto/order.dto";

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAllOrders() {
    return this.ordersRepository.find();
  }

  async getOrderByID(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id: id } });
    if (order) {
      return plainToClass(orderDto, order);
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async createOrder(orderDTO: createOrderDto) {
    const user = await this.usersRepository.findOneBy({ id: orderDTO.userId });
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
    const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
    order.user = user;
    order.books = books;
    order.totalPrice = totalPrice;
    await this.ordersRepository.save(order);
    return plainToClass(orderDto, order);
  }

  async updateOrder(orderId: number, orderDTO: updateOrderDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['books'],
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
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
