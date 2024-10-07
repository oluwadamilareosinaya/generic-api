import { Injectable, NotFoundException } from '@nestjs/common';
import { JobsRespository } from './job.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.entity';
import { FilterJobDto } from './dto/filter-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRespository) {}

  async getJobs(filterJobDto: FilterJobDto, user: User): Promise<Job[]> {
    const jobs = await this.jobsRepository.getJobs(filterJobDto, user);
    return jobs;
  }

  async getJobById(id: string): Promise<Job> {
    const found = this.jobsRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Job with Id "${id}" does not exist.`);
    }

    return found;
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    return await this.jobsRepository.createJob(createJobDto);
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.getJobById(id);

    const updatedJob = { ...job, ...updateJobDto };
    await this.jobsRepository.save(updatedJob);
    return updatedJob;
  }

  async deleteJob(id: string): Promise<void> {
    const res = await this.jobsRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Job with Id "${id}" does not exist.`);
    }
  }
}
