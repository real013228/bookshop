import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('/order/hello')
  getHello() {
    return this.orderService.getHello();
  }
}
