import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private app: INestApplication<any>;

  constructor(app: INestApplication<any>) {
    this.app = app;
  }

  public init() {
    const config = new DocumentBuilder()
      .setTitle(process.env.SWAGGER_TITLE)
      .setDescription(process.env.SWAGGER_DESCREPTION)
      .setVersion(process.env.SWAGGER_VERSION)
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('docs', this.app, document);
  }
}
