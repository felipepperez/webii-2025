import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';

describe('OrderService', () => {
  let service: OrderService;
  let gateway: OrderGateway;

  beforeEach(async () => {
    gateway = {
      broadcastReadyOrder: jest.fn(),
    }as unknown as OrderGateway;

    service = new OrderService(gateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a valid order', ()=>{
    service.addOrder('123');
    expect(service.getAllOrders()).toEqual(['123']);
  })

  it('should not add an empty order', ()=>{
    service.addOrder('');
    service.addOrder('     ');
    expect(service.getAllOrders()).toEqual([]);
  })

  it('should return all orders', ()=>{
    service.addOrder('123');
    service.addOrder('456');
    expect(service.getAllOrders()).toEqual(['123','456']);
  })

  it('should mark an order as reay and remove it from the lists', ()=>{
    service.addOrder('123');
    service.addOrder('456');

    service.markAsReady('123');

    expect(service.getAllOrders()).toEqual(['456']);
    expect(gateway.broadcastReadyOrder).toHaveBeenCalledWith('123');
  })

  it('should not call broadcast or modify list for empty number', ()=>{
    service.addOrder('123');

    service.markAsReady('');
    service.markAsReady('    ');

    expect(service.getAllOrders()).toEqual(['123']);
    expect(gateway.broadcastReadyOrder).not.toHaveBeenCalled();
  })

  it('should not call broadcast trying to mark an order that does not exists',()=>{
    service.addOrder('123');
    service.markAsReady('999');

    expect(service.getAllOrders()).toEqual(['123']);
    expect(gateway.broadcastReadyOrder).not.toHaveBeenCalled();
  })
});
