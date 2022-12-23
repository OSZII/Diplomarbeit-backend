import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller()
@ApiTags('Flower Auf Dauer backend')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
