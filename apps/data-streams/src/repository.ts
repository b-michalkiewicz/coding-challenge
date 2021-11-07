import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class Repository {
    private static readonly cacheKey = 'data-streams-key';
    private readonly client;

    constructor() {
        this.client = createClient();
    }

    async upsertData(data: unknown[]): Promise<void> {
        await this.checkConnection();
        const stored: unknown[] = JSON.parse((await this.client.get(Repository.cacheKey)) ?? '[]');
        await this.client.set(Repository.cacheKey, JSON.stringify([...stored, ...data]));
    }

    async getData(): Promise<unknown[]> {
        await this.checkConnection();
        return JSON.parse((await this.client.get(Repository.cacheKey)) ?? '[]');
    }

    private async checkConnection() {
        if (this.client.isOpen) return;
        await this.client.connect();
    }
}
