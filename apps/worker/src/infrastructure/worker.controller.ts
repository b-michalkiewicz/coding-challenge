import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
    constructor(private readonly workerService: WorkerService) {}

    getHello(): string {
        return this.workerService.getHello();
    }

    @MessagePattern('test-event')
    test(@Payload() data: any) {
        console.log(data);
    }
}
