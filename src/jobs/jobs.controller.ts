import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.entity';
import { FilterJobDto } from './dto/filter-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getJobs(
    @Query() filterJObDto: FilterJobDto,
    @GetUser() user: User,
  ): Promise<Job[]> {
    return this.jobsService.getJobs(filterJObDto, user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getJobById(@Param('id') id: string): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createJob(
    @Body(ValidationPipe) createJobDto: CreateJobDto,
  ): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateJob(
    @Param('id') id: string,
    @Body(ValidationPipe) updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.updateJob(id, updateJobDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteJob(@Param('id') id: string): Promise<void> {
    return this.jobsService.deleteJob(id);
  }
}
