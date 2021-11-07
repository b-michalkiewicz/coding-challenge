import { HttpModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { dataProviderConfig } from '../application/config';
import { HttpDataProvider } from '../application/http-data-provider';
import { WorkerController } from './worker.controller';
import { WorkerScheduler } from './worker.scheduler';
import { WorkerService } from './worker.service';

@Module({
    imports: [
        HttpModule,
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot(),
        ClientsModule.register([
            {
                name: 'DataQueueClient',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'data_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [WorkerController],
    providers: [
        { provide: 'DataProviderConfig', useValue: dataProviderConfig },
        HttpDataProvider,
        WorkerScheduler,
        WorkerService,
    ],
})
export class WorkerModule {}
