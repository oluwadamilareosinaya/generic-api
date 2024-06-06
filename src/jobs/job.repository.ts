import { DataSource, Repository } from 'typeorm';
import { Job } from './job.entity';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsRespository extends Repository<Job> {
  constructor(private dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }

  async getJobs(filterJObDto: FilterJobDto): Promise<Job[]> {
    const { search, employment_type, location, industry } = filterJObDto;

    const query = this.createQueryBuilder('job');

    if (employment_type) {
      query.andWhere('job.employment_type = :employment_type', {
        employment_type,
      });
    }

    if (location) {
      query.andWhere('job.location = :location', {
        location,
      });
    }

    if (industry) {
      query.andWhere('job.industry = :industry', {
        industry,
      });
    }

    if (search) {
      query.andWhere(
        'LOWER(job.role) LIKE LOWER(:search) OR LOWER(job.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const jobs = query.getMany();
    return jobs;
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.create(createJobDto);
    await this.save(job);
    return job;
  }
}
