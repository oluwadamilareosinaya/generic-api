import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';
import { FilterGoodDto } from './dto/filter-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('goods')
@UseGuards(AuthGuard('jwt'))
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  getGoods(
    @Query() filterGoodDto: FilterGoodDto,
    @GetUser() user: User,
  ): Promise<Good[]> {
    return this.goodsService.getGoods(filterGoodDto, user);
  }

  @Get('/:id')
  getGoodById(@Param('id') id: string, @GetUser() user: User): Promise<Good> {
    return this.goodsService.getGoodById(id, user);
  }

  @Post()
  createGood(
    @Body() createGoodDto: CreateGoodDto,
    @GetUser() user: User,
  ): Promise<Good> {
    return this.goodsService.createGood(createGoodDto, user);
  }

  @Patch('/:id')
  updateGood(
    @Param('id') id: string,
    @Body() updateGoodDto: UpdateGoodDto,
    @GetUser() user: User,
  ): Promise<Good> {
    return this.goodsService.updateGood(id, updateGoodDto, user);
  }

  @Delete('/:id')
  deleteGood(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.goodsService.deleteGood(id, user);
  }
}
