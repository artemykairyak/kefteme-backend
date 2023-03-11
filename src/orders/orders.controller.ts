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
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseOrderDto } from './dto/response-orders.dto';
import { ResponseDto } from '../request-response/dto/response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ResponseDto })
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

  @ApiResponse({ status: 200, type: ResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
