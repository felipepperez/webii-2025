import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  broadcastReadyOrder(orderNumber: string) {
    this.server.emit('order_ready', orderNumber);
  }
}
