import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Flower auf Dauer Backend')
    .setDescription(
      'Backend in NestJS and Prisma Diploma Thesis for Flower Auf Dauer',
    )
    .setVersion('1.0')
    .build();

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // i supose this creates a white list with properties
      forbidNonWhitelisted: true, // i supose this restrict by white list criteria
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
