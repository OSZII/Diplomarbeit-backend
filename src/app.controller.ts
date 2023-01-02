import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
const prisma = new PrismaClient();

@Controller()
// @UseGuards(JwtAuthGuard)
@ApiTags('Flower Auf Dauer backend')
export class AppController {
  constructor(private authService: AuthService) {}
  //   removing magic string local
  //   @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //   EXAMPLE: for how to make an exception for a route
  //   import { SetMetadata } from '@nestjs/common';
  //   // Convienience Function
  //   const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);
  //   @Controller()
  //   export class AppController {

  //     @Get('my-unauthorized-path')
  //     @AllowUnauthorizedRequest()
  //     myHandler () {
  //       return { unauthorized: true };
  //     }

  //   }
}
