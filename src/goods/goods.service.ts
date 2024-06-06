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

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodRepository) {}

  async getGoods(filterGoodDto: FilterGoodDto): Promise<Good[]> {
    const goods = await this.goodsRepository.getGoods(filterGoodDto);
    return goods;
  }

  async getGoodById(id: string): Promise<Good> {
    const found = await this.goodsRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Good with id "${id}" does not exist.`);
    }
    return found;
  }

  async createGood(createGoodDto: CreateGoodDto): Promise<Good> {
    return await this.goodsRepository.createGood(createGoodDto);
  }

  async updateGood(id: string, updateGoodDto: UpdateGoodDto): Promise<Good> {
    const { price } = updateGoodDto;

    if (!+price) {
      throw new BadRequestException('Price can not be a string');
    }

    const good = await this.getGoodById(id);

    const updatedGood = { ...good, ...updateGoodDto };

    await this.goodsRepository.save(updatedGood);
    return updatedGood;
  }

  async deleteGood(id: string): Promise<void> {
    const res = await this.goodsRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Good with id "${id}" does not exist.`);
    }
  }
}
