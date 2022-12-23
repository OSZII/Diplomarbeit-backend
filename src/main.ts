import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Flower auf Dauer Backend')
    .setDescription(
      'Backend in NestJS and Prisma Diploma Thesis for Flower Auf Dauer',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //   const { httpAdapter } = app.get(HttpAdapterHost);
  //   app.useGlobalFilters(
  //     new PrismaClientExceptionFilter(httpAdapter, {
  //       // Prisma Error Code: HTTP Status Response
  //       P2000: HttpStatus.BAD_REQUEST,
  //       P2002: HttpStatus.CONFLICT,
  //       P2025: HttpStatus.NOT_FOUND,
  //     }),
  //   );

  await app.listen(3000);
}
bootstrap();
