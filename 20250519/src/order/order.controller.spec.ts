import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { AuthGuard } from '../auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let mockOrderService: { addOrder: jest.Mock, markAsReady: jest.Mock, getAllOrders: jest.Mock };

  beforeEach(async () => {
    mockOrderService = {
      addOrder: jest.fn(),
      markAsReady: jest.fn(),
      getAllOrders: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).overrideGuard(AuthGuard).useValue({
      canActivate: (context: ExecutionContext) => true
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
