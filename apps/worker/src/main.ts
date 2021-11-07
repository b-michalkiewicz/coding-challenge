import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { WorkerModule } from './infrastructure/worker.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
        // Setup communication protocol here
    });
    app.listen(async () => {
        console.log('Microservice is listening');
    });
}
bootstrap();
