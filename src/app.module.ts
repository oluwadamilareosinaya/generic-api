import { Module } from '@nestjs/common';
import { GoodsModule } from './goods/goods.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    GoodsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'generic-api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
