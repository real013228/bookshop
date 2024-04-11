import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { createOrderDto } from './dto/create-order.dto';
import { updateOrderDto } from './dto/update-order.dto';

@Controller()
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('/order/hello')
  getHello() {
    return this.orderService.getHello();
  }
  @Get('/order')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Get('/order/:id')
  getOrderByID(@Param('id') id: string) {
    return this.orderService.getOrderByID(Number(id));
  }
  @Post('/order')
  async createOrder(@Body() post: createOrderDto) {
    return this.orderService.createOrder(post);
  }

  @Put('/order/:id')
  async updateOrder(@Body() post: updateOrderDto, @Param('id') id: string) {
    return this.orderService.updateOrder(Number(id), post);
  }

  @Delete('/order/:id')
  async deleteOrder(@Param('id') id: string) {
    this.orderService.deleteOrder(Number(id));
  }
}
