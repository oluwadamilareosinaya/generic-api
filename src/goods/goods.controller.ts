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
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  getGoods(
    @Query() filterGoodDto: FilterGoodDto,
    @GetUser() user: User,
  ): Promise<Good[]> {
    return this.goodsService.getGoods(filterGoodDto, user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  getGoodById(@Param('id') id: string, @GetUser() user: User): Promise<Good> {
    return this.goodsService.getGoodById(id, user);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  createGood(
    @Body() createGoodDto: CreateGoodDto,
    @GetUser() user: User,
  ): Promise<Good> {
    return this.goodsService.createGood(createGoodDto, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  updateGood(
    @Param('id') id: string,
    @Body() updateGoodDto: UpdateGoodDto,
    @GetUser() user: User,
  ): Promise<Good> {
    return this.goodsService.updateGood(id, updateGoodDto, user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  deleteGood(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.goodsService.deleteGood(id, user);
  }
}
