import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
const prisma = new PrismaClient();

@Controller()
@ApiTags('Flower Auf Dauer backend')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async loging(@Request() req) {
    return req.user;
  }

  //   @Get()
  //   getHello(): string {
  //     return this.appService.getHello();
  //   }
}
