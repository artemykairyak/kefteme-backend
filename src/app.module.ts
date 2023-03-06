import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ColorsModule } from './colors/colors.module';
import { TypesModule } from './types/types.module';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      autoLoadEntities: true,
      connectTimeout: 20000,
      acquireTimeout: 20000,
    }),
    UsersModule,
    ProductsModule,
    ColorsModule,
    TypesModule,
    SizesModule,
  ],
})
export class AppModule {}
