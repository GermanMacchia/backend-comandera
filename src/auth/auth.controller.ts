import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/ChangePassword.dto';

import { Public } from '@src/interfaces/decorators';
import { Request as ExpressRequest, Router } from 'express';
import { LoginDto } from './dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() req: LoginDto) {
    return await this.authService.login(req);
  }

  @Public()
  @Get('refresh')
  async refresh(@Request() req: any) {
    return await this.authService.refresh(req.headers.authorization);
  }

  @Public()
  @Post('password/change')
  async password(@Body() body: ChangePasswordDto) {
    return await this.authService.cambiarPassword(body.token, body.password);
  }

  @Get('list')
  async list(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    return {
      routes: router.stack
        .map((layer) => {
          if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return `${method.toUpperCase()} ${path}`;
          }
        })
        .filter((item) => item !== undefined),
    };
  }
}
