import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DogFacts } from 'common/types';
import { DogFactsRepository } from './app.repository';

@Injectable()
export class AppService {
    constructor(
        @Inject('WorkerService') private readonly clientProxy: ClientProxy,
        @Inject(DogFactsRepository) private readonly repository: DogFactsRepository,
    ) {}

    startDataStream(): void {
        this.clientProxy.emit('start-data-collecting', JSON.stringify({}));
    }

    stopDataStream(): void {
        this.clientProxy.emit('stop-data-collecting', JSON.stringify({}));
    }

    async upsertData(data: DogFacts): Promise<void> {
        await this.repository.upsertData(data);
    }

    async getData(): Promise<DogFacts> {
        return this.repository.getData();
    }
}
