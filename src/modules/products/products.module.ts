import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';
import { ProductsController } from './products.controller';
import { InsertProductService } from './application/services/insert-product.service';
import { ReadProductService } from './application/services/read-product.service';
import { UpdateProductService } from './application/services/update-product.service';
import { DeleteProductService } from './application/services/delete-product.service';
import { ProductFactory } from './domain/factories/product.factory';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
  IInsertProductServiceToken,
  IUpdateProductServiceToken,
  IDeleteProductServiceToken,
  IReadProductServiceToken,
} from 'src/shared/domain/constants';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: IProductFactoryToken,
      useClass: ProductFactory,
    },
    {
      provide: IProductRepositoryToken,
      useClass: PrismaProductRepository,
    },
    {
      provide: IInsertProductServiceToken,
      useClass: InsertProductService,
    },
    {
      provide: IUpdateProductServiceToken,
      useClass: UpdateProductService,
    },
    {
      provide: IDeleteProductServiceToken,
      useClass: DeleteProductService,
    },
    {
      provide: IReadProductServiceToken,
      useClass: ReadProductService,
    },
  ],
})
export class ProductsModule {} 