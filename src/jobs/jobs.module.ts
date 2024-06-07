import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobsRespository } from './job.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), AuthModule],
  providers: [JobsService, JobsRespository],
  controllers: [JobsController],
})
export class JobsModule {}
