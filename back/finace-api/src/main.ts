import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*", // Permite requisições do Next.js
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  });
  await app.listen(4000, "0.0.0.0"); // 🔹 Isso permite acesso externo (não só localhost)
}
bootstrap();
