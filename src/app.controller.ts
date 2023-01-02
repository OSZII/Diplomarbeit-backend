import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
const prisma = new PrismaClient();

@Controller()
@ApiTags('Flower Auf Dauer backend')
export class AppController {
  constructor(private readonly appService: AppService) {}
  //   removing magic string local
  //   @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async loging(@Request() req) {
    return req.user;
  }

  //   @Get()
  //   getHello(): string {
  //     return this.appService.getHello();
  //   }
}
