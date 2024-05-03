import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create-order.dto';
import { updateOrderDto } from './dto/update-order.dto';
import { orderDto } from './dto/order.dto';

@ApiTags('Order')
@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of all orders',
    type: [orderDto],
  })
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiResponse({ status: 200, description: 'Order details', type: orderDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the order to retrieve',
    type: 'integer',
  })
  getOrderByID(@Param('id') id: string) {
    return this.orderService.getOrderByID(Number(id));
  }

  @Get('user/:email')
  @ApiOperation({ summary: 'Retrieve all orders for a specific user' })
  @ApiParam({
    name: 'email',
    description: 'Unique email for the user whose orders are being requested',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'A list of orders',
    type: [orderDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No orders found for this user',
  })
  async getAllOrdersByUser(@Param('email') email: string) {
    const orders = await this.orderService.findAllOrdersByUserEmail(email);
    if (!orders.length) {
      throw new HttpException(
        'No orders found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    return orders;
  }
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: createOrderDto,
    description: 'Order data for creating a new order',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: orderDto,
  })
  async createOrder(@Body() post: createOrderDto) {
    return this.orderService.createOrder(post);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the order to be updated',
    type: 'integer',
  })
  @ApiBody({
    type: updateOrderDto,
    description: 'Order data to update an existing order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order updated successfully',
    type: orderDto,
  })
  async updateOrder(@Body() post: updateOrderDto, @Param('id') id: string) {
    return this.orderService.updateOrder(Number(id), post);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the order to delete',
    type: 'integer',
  })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(Number(id));
  }
}
