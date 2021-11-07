import { Controller, Delete, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    startDataStream(): void {
        return this.appService.startDataStream();
    }

    @Delete()
    stopDataStream(): void {
        return this.appService.stopDataStream();
    }

    @MessagePattern('new-data')
    dataHandler(@Payload() data: unknown) {
        console.log(data);
    }
}
