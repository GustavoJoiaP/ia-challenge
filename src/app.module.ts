import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeProductsModule } from './modules/type-products/type-products.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [UsersModule, TypeProductsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
