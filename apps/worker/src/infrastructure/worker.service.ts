import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { isError, Result } from 'common/result';
import { v4 as uuid } from 'uuid';
import { DogFacts } from '../application/decoder';
import { HttpDataProvider } from '../application/http-data-provider';
import { DataPipeline } from '../domain/data-pipeline';

@Injectable()
export class WorkerService extends DataPipeline<DogFacts> {
    private readonly logger = new Logger(WorkerService.name);

    constructor(
        @Inject('DataQueueClient') private readonly clientProxy: ClientProxy,
        dataProvider: HttpDataProvider,
        eventEmitter: EventEmitter2,
    ) {
        super(
            () => dataProvider.fetchData(),
            [],
            (event) => eventEmitter.emit(`data-pipeline.${event.kind}`, event),
        );
    }

    async run(): Promise<Result<DogFacts>> {
        const runId = uuid();

        this.logger.log(`Run ${runId} started at ${new Date().toISOString()}`);

        const result = await super.run();
        if (isError(result)) {
            this.logger.error(`Run ${runId} failed with error: ${result.message}`);
            return result;
        }

        this.clientProxy.emit('new-data', JSON.stringify(result));

        this.logger.log(`Run ${runId} finished at ${new Date().toISOString()}`);

        return result;
    }
}
