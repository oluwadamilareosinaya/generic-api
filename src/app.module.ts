import { Module } from '@nestjs/common';
import { GoodsModule } from './goods/goods.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    GoodsModule,
    JobsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
