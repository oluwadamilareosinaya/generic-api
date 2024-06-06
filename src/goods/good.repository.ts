import { DataSource, Repository } from 'typeorm';
import { Good } from './good.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { FilterGoodDto } from './dto/filter-good.dto';

@Injectable()
export class GoodRepository extends Repository<Good> {
  constructor(private dataSource: DataSource) {
    super(Good, dataSource.createEntityManager());
  }

  async getGoods(filterGoodDto: FilterGoodDto): Promise<Good[]> {
    const { search, tag } = filterGoodDto;
    const query = this.createQueryBuilder('good');

    if (tag) {
      query.andWhere('good.tag = :tag', { tag });
    }

    if (search) {
      query.andWhere(
        'LOWER(good.title) LIKE LOWER(:search) OR LOWER(good.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const good = query.getMany();
    return good;
  }

  async createGood(createGoodDto: CreateGoodDto): Promise<Good> {
    const { title, tag, price, description } = createGoodDto;

    if (!+price) {
      throw new BadRequestException('Price can not be a string');
    }

    const good = this.create({
      title,
      price,
      description,
      tag,
    });

    await this.save(good);

    return good;
  }
}
