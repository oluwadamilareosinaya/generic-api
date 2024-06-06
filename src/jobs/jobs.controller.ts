import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.entity';
import { FilterJobDto } from './dto/filter-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getJobs(@Query() filterJObDto: FilterJobDto): Promise<Job[]> {
    return this.jobsService.getJobs(filterJObDto);
  }

  @Get('/:id')
  async getJobById(@Param('id') id: string): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @Post()
  async createJob(
    @Body(ValidationPipe) createJobDto: CreateJobDto,
  ): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  @Patch('/:id')
  async updateJob(
    @Param('id') id: string,
    @Body(ValidationPipe) updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.updateJob(id, updateJobDto);
  }

  @Delete('/:id')
  async deleteJob(@Param('id') id: string): Promise<void> {
    return this.jobsService.deleteJob(id);
  }
}
