import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './swagger/init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new Swagger(app).init();

  await app.listen(3000);
}
bootstrap();
