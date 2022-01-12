import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Desafio Meta')
    .setDescription('Locadora!')
    .setVersion('1.0')
    .setContact(
      'Yuri Guimarães Rodrigues',
      'https://github.com/yrcunha',
      'yrcunha@gmail.com',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(process.env.PORT);
}
bootstrap();
