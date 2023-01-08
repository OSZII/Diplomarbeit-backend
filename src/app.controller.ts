import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './public.decorator';
const prisma = new PrismaClient();

// Allow login route without jwt (obviously)
const AllowUnauthorizedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);

@AllowUnauthorizedRequest()
@Controller()
// @UseGuards(JwtAuthGuard)
@ApiTags('Flower Auf Dauer backend')
export class AppController {
  constructor(private authService: AuthService) {}
  //   removing magic string local
  //   @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Public()
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
