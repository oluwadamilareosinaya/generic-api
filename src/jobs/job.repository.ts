import { DataSource, Repository } from 'typeorm';
import { Job } from './job.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class JobsRespository extends Repository<Job> {
  private logger = new Logger('JobsRespository');
  constructor(private dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }

  async getJobs(filterJObDto: FilterJobDto, user: User): Promise<Job[]> {
    const { search, employment_type, location, industry } = filterJObDto;

    const query = this.createQueryBuilder('job');
    query.where({ user });

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

    try {
      const jobs = query.getMany();
      return jobs;
    } catch (error) {
      this.logger.error(
        `Failed to get jobs for userId "${user.id}", Filters "${JSON.stringify(filterJObDto)}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.create(createJobDto);
    await this.save(job);
    return job;
  }
}
