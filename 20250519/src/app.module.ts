import { Module } from '@nestjs/common';
import { OrderGateway } from './order/order.gateway';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderGateway, OrderService, AuthGuard],
})
export class AppModule {}
