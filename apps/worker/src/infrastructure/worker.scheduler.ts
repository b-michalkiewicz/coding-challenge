import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WorkerService } from './worker.service';

@Injectable()
export class WorkerScheduler {
    private static readonly cronTime = CronExpression.EVERY_5_MINUTES;
    private static readonly cronName = 'worker-cron';

    constructor(private readonly schedulerRegistry: SchedulerRegistry, private readonly workerService: WorkerService) {}

    startDataCollecting() {
        const job = new CronJob(WorkerScheduler.cronTime, () => this.workerService.run());
        this.schedulerRegistry.addCronJob(WorkerScheduler.cronName, job);
        this.workerService.run();
        job.start();
    }

    stopDataCollecting() {
        this.schedulerRegistry.deleteCronJob(WorkerScheduler.cronName);
    }
}
