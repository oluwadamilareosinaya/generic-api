import { DataSource, Repository } from 'typeorm';
import { Good } from './good.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { FilterGoodDto } from './dto/filter-good.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class GoodRepository extends Repository<Good> {
  private logger = new Logger('GoodsRepository');
  constructor(private dataSource: DataSource) {
    super(Good, dataSource.createEntityManager());
  }

  async getGoods(filterGoodDto: FilterGoodDto, user: User): Promise<Good[]> {
    const { search, tag } = filterGoodDto;

    const query = this.createQueryBuilder('good');
    query.where({ user });

    if (tag) {
      query.andWhere('good.tag = :tag', { tag });
    }

    if (search) {
      query.andWhere(
        '(LOWER(good.title) LIKE LOWER(:search) OR LOWER(good.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const good = query.getMany();
      return good;
    } catch (error) {
      this.logger.error(
        `Failed to get goods for userId "${user.id}", Filters "${JSON.stringify(filterGoodDto)}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createGood(createGoodDto: CreateGoodDto, user: User): Promise<Good> {
    const { title, tag, price, description } = createGoodDto;

    if (!+price) {
      throw new BadRequestException('Price can not be a string');
    }

    const good = this.create({
      title,
      price,
      description,
      tag,
      user,
    });

    await this.save(good);

    return good;
  }
}
