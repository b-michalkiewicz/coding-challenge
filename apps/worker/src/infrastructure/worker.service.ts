import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { isError, Result } from 'common/result';
import { DogFacts } from '../application/decoder';
import { HttpDataProvider } from '../application/http-data-provider';
import { DataPipeline } from '../domain/data-pipeline';

@Injectable()
export class WorkerService extends DataPipeline<DogFacts> {
    constructor(
        @Inject('DataQueueClient') private readonly clientProxy: ClientProxy,
        dataProvider: HttpDataProvider,
        eventEmitter: EventEmitter2,
    ) {
        super(() => dataProvider.fetchData(), [], { emit: (e) => eventEmitter.emit(`data-pipeline.${e.kind}`, e) });
    }

    async run(): Promise<Result<DogFacts>> {
        const result = await super.run();
        if (isError(result)) return result;

        this.clientProxy.emit('new-data', JSON.stringify(result));

        return result;
    }
}
