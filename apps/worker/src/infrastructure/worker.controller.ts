import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkerScheduler } from './worker.scheduler';

@Controller()
export class WorkerController {
    constructor(private readonly scheduler: WorkerScheduler) {}

    @MessagePattern('start-data-collecting')
    startScheduler() {
        this.scheduler.startDataCollecting();
    }

    @MessagePattern('stop-data-collecting')
    stopScheduler() {
        this.scheduler.stopDataCollecting();
    }
}
