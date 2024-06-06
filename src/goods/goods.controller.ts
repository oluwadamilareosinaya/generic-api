import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';
import { FilterGoodDto } from './dto/filter-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  getGoods(@Query() filterGoodDto: FilterGoodDto): Promise<Good[]> {
    return this.goodsService.getGoods(filterGoodDto);
  }

  @Get('/:id')
  getGoodById(@Param('id') id: string): Promise<Good> {
    return this.goodsService.getGoodById(id);
  }

  @Post()
  createGood(
    @Body(ValidationPipe) createGoodDto: CreateGoodDto,
  ): Promise<Good> {
    return this.goodsService.createGood(createGoodDto);
  }

  @Patch('/:id')
  updateGood(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGoodDto: UpdateGoodDto,
  ): Promise<Good> {
    return this.goodsService.updateGood(id, updateGoodDto);
  }

  @Delete('/:id')
  deleteGood(@Param('id') id: string): Promise<void> {
    return this.goodsService.deleteGood(id);
  }
}
