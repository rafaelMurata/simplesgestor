import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar pipes globais
  app.useGlobalPipes(new ValidationPipe());

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:4202'
    ],
    credentials: true,
  });

  // Configurar prefixo global
  app.setGlobalPrefix('api');

  const port = process.env['PORT'] || 3333;
  await app.listen(port);
  console.log(`Aplicação está rodando na porta: ${port}`);
}

bootstrap();
