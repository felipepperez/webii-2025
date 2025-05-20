import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        if(request.session?.authenticated){
            return true;
        }

        response.redirect('/login');
        return false;
    }
}