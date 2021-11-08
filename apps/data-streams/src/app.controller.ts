import { Controller, Delete, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('data-stream/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('start')
    startDataStream(): void {
        return this.appService.startDataStream();
    }

    @Delete('stop')
    stopDataStream(): void {
        return this.appService.stopDataStream();
    }

    @Get('data')
    getData() {
        return this.appService.getData();
    }

    @MessagePattern('new-data')
    dataHandler(@Payload() data: string) {
        this.appService.upsertData(JSON.parse(data));
    }
}
