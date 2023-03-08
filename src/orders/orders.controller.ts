import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseOrderDto } from './dto/response-orders.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user, createOrderDto);
  }

  @ApiResponse({ status: 200, type: ResponseOrderDto, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiHeader({ name: 'Authorization', description: 'Bearer {access_token}' })
  findUserOrders(@Request() req) {
    return this.ordersService.findAllUserOrders(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // findOne(@Request() req, @Param('id') orderId: string) {
  //   return this.ordersService.getOrderById(req.user, orderId);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
