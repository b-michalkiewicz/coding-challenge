import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkerModule } from './infrastructure/worker.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'worker_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    app.listen(async () => {
        console.log('Microservice is listening');
    });
}
bootstrap();
