import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from './repository';

@Injectable()
export class AppService {
    constructor(@Inject('WorkerService') private readonly clientProxy: ClientProxy, private readonly repository: Repository) {}

    startDataStream(): void {
        this.clientProxy.emit('start-data-collecting', JSON.stringify({}));
    }

    stopDataStream(): void {
        this.clientProxy.emit('stop-data-collecting', JSON.stringify({}));
    }

    async upsertData(data: unknown[]): Promise<void> {
        await this.repository.upsertData(data);
    }

    async getData(): Promise<unknown[]> {
        return this.repository.getData();
    }
}
