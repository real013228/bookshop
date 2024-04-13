import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './order.entity';
import User from '../user/user.entity';
import Book from '../book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Book, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
