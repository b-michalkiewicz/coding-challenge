import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(@Inject('WorkerService') private readonly clientProxy: ClientProxy) {}

    startDataStream(): void {
        this.clientProxy.emit('start-data-collecting', JSON.stringify({}));
    }

    stopDataStream(): void {
        this.clientProxy.emit('stop-data-collecting', JSON.stringify({}));
    }
}
