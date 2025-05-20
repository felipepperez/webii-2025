import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth.guard';

@Controller()
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get('/login')
    loginPage(@Res() res: Response, @Req() req: any) {
        if(req.session.authenticated){
            return res.redirect('/');
        }
        res.render('login');
    }

    @Post('/login')
    login(@Body() body, @Req() req: any, @Res() res: Response) {
        const { username, password } = body;
        if (username === 'admin' && password === '1234') {
            req.session.authenticated = true;
            return res.redirect('/');
        }
        res.render('login', { error: 'Invalid credentials' });
    }

    @Get('logout')
    logout(@Res() res: Response, @Req() req: any){
        req.session.destroy(()=> res.redirect('/login'));
    }

    @UseGuards(AuthGuard)
    @Get('/')
    operatorScreen(@Res() res: Response) {
        res.render('operator', { orders: this.orderService.getAllOrders() });
    }

    @Get('/screen')
    clientScreen(@Res() res: Response) {
        res.render('client');
    }

    @UseGuards(AuthGuard)
    @Post('/add')
    addOrder(@Body() body, @Res() res: Response) {
        this.orderService.addOrder(body.number);
        res.redirect('/');
    }

    @UseGuards(AuthGuard)
    @Post('/ready')
    markOrderAsReady(@Body() body, @Res() res: Response) {
        this.orderService.markAsReady(body.number);
        res.redirect('/');
    }

}
