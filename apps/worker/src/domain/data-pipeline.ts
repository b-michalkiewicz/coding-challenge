import { Error, isError, Result } from 'common/result';
import { DataMiddleware, DataObject, DataProvider, EventEmitter } from './types';

export class DataPipeline<Data extends DataObject> {
    constructor(
        private readonly provider: DataProvider<Data>,
        private readonly middlewares: DataMiddleware<Data>[],
        private readonly eventEmitter: EventEmitter,
    ) {}

    protected async run(): Promise<Result<Data>> {
        const rawData = await this.provider();

        return isError(rawData) ? this.handleError(rawData) : this.handleSuccess(rawData);
    }

    private async handleError(error: Error) {
        this.eventEmitter({ kind: 'error', message: error.message });
        return error;
    }

    private async handleSuccess(rawData: Data) {
        const data = this.middlewares.reduce((data, middleware) => middleware(data), rawData);
        this.eventEmitter({ kind: 'success', data });
        return data;
    }
}
