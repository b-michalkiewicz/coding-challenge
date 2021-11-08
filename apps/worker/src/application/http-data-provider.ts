import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { DataProviderConfig } from './config';
import { DataFetchError, hasMessage } from './errors';

@Injectable()
export class HttpDataProvider {
    constructor(
        @Inject(DataProviderConfig) private readonly config: DataProviderConfig,
        private readonly httpService: HttpService,
    ) {}

    async fetchData() {
        try {
            return this.config.decoder((await this.httpService.get(this.config.url).toPromise()).data);
        } catch (error) {
            return new DataFetchError(hasMessage(error) ? error.message : 'Unknown fetch error');
        }
    }
}
