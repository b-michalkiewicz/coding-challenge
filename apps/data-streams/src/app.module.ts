import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { DogFactsRepository, RedisDogFactsRepository } from './app.repository';
import { AppService } from './app.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'WorkerService',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'worker_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: DogFactsRepository,
            useClass: RedisDogFactsRepository,
        },
    ],
})
export class AppModule {}
