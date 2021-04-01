import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const serverPrefix = 'api';

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(serverPrefix);

  const config = new DocumentBuilder()
    .setTitle('mcare-snidbo-file-manager')
    .setDescription('API file manager')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${serverPrefix}/docs`, app, document);

  await app.listen(5000);
}
bootstrap();
