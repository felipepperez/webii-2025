import { Injectable } from '@nestjs/common';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
    private orders: string[] = [];

    constructor(private gateway: OrderGateway) { }

    addOrder(number: string) {
        if(!number || number.trim() === '') return;
        this.orders.push(number);
    }

    getAllOrders() {
        return this.orders;
    }

    markAsReady(number: string) {
        if(!number || number.trim() === '') return;
        
        const filteredNumber = this.orders.filter(order => order == number);
        if(filteredNumber.length == 0) return;

        this.orders = this.orders.filter(order => order !== number);

        this.gateway.broadcastReadyOrder(number);
    }
}
