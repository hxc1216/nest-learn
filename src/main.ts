import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 使用 FastifyAdapter 替换默认的 Express
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// 版本配置
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';

import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionsFilter } from './common/exceptions/http.exception.filter';

import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionsFilter());

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'], // 版本设置 VERSION_NEUTRAL:任何版本或者没有版本
    type: VersioningType.URI,
  });

  // 创建文档
  generateDocument(app);

  // 开启HMR热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
