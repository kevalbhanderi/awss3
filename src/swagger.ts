import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

export const swagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Aws s3 service')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addServer('/api/')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
    include: [AuthModule, AdminModule],
  });
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Aws s3 API',
    explorer: false,
  });
};
