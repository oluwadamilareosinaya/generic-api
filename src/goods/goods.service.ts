import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';
import { GoodRepository } from './good.repository';
import { FilterGoodDto } from './dto/filter-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodRepository) {}

  async getGoods(filterGoodDto: FilterGoodDto, user: User): Promise<Good[]> {
    const goods = await this.goodsRepository.getGoods(filterGoodDto, user);
    return goods;
  }

  async getGoodById(id: string, user: User): Promise<Good> {
    const found = await this.goodsRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Good with id "${id}" does not exist.`);
    }
    return found;
  }

  async createGood(createGoodDto: CreateGoodDto, user: User): Promise<Good> {
    return await this.goodsRepository.createGood(createGoodDto, user);
  }

  async updateGood(
    id: string,
    updateGoodDto: UpdateGoodDto,
    user: User,
  ): Promise<Good> {
    const { price } = updateGoodDto;

    if (!+price) {
      throw new BadRequestException('Price can not be a string');
    }

    const good = await this.getGoodById(id, user);

    const updatedGood = { ...good, ...updateGoodDto };

    await this.goodsRepository.save(updatedGood);
    return updatedGood;
  }

  async deleteGood(id: string, user: User): Promise<void> {
    const res = await this.goodsRepository.delete({ id, user });
    if (res.affected === 0) {
      throw new NotFoundException(`Good with id "${id}" does not exist.`);
    }
  }
}
