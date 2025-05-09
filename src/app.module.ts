import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeProductsModule } from './modules/type-products/type-products.module';

@Module({
  imports: [UsersModule, TypeProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
