import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobsRespository } from './job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobsService, JobsRespository],
  controllers: [JobsController],
})
export class JobsModule {}
