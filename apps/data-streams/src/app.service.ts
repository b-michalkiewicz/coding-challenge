import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(@Inject('worker_service') private readonly clientProxy: ClientProxy) {}

    getHello(): string {
        this.clientProxy.emit('test-event', JSON.stringify({ test: 42 }));
        return 'Hello World!';
    }
}
