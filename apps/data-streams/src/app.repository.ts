import { Injectable } from '@nestjs/common';
import { DogFacts } from 'common/types';
import { createClient } from 'redis';

export interface DogFactsRepository {
    upsertData(data: DogFacts): Promise<void>;
    getData(): Promise<DogFacts>;
}
export const DogFactsRepository = Symbol.for('DogFactsRepository');

@Injectable()
export class RedisDogFactsRepository {
    private static readonly cacheKey = 'data-streams-key';
    private readonly client;

    constructor() {
        this.client = createClient();
    }

    async upsertData(data: unknown[]): Promise<void> {
        await this.checkConnection();
        await this.client.set(RedisDogFactsRepository.cacheKey, JSON.stringify([...(await this.getData()), ...data]));
    }

    async getData(): Promise<unknown[]> {
        await this.checkConnection();
        return JSON.parse((await this.client.get(RedisDogFactsRepository.cacheKey)) ?? '[]');
    }

    private async checkConnection() {
        if (this.client.isOpen) return;
        await this.client.connect();
    }
}
