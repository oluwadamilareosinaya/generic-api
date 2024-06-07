import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './good.entity';
import { GoodRepository } from './good.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Good])],
  providers: [GoodsService, GoodRepository],
  controllers: [GoodsController],
})
export class GoodsModule {}
