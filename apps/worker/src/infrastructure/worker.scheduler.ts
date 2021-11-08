import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WorkerService } from './worker.service';

@Injectable()
export class WorkerScheduler {
    private static readonly cronTime = CronExpression.EVERY_5_MINUTES;
    private static readonly cronName = 'worker-cron';

    private readonly logger = new Logger(WorkerScheduler.name);

    constructor(private readonly schedulerRegistry: SchedulerRegistry, private readonly workerService: WorkerService) {}

    startDataCollecting() {
        this.logger.log('Starting new data collection job...');

        const job = new CronJob(WorkerScheduler.cronTime, () => this.workerService.runDataPipeline());
        this.schedulerRegistry.addCronJob(WorkerScheduler.cronName, job);
        job.start();

        this.workerService.runDataPipeline();
    }

    stopDataCollecting() {
        this.logger.log('Stopping new data collection job...');

        this.schedulerRegistry.deleteCronJob(WorkerScheduler.cronName);
    }
}
