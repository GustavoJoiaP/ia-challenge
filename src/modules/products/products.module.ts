import { Module } from '@nestjs/common';
import { InsertProductService } from './application/services/insert-product.service';
import { ReadProductService } from './application/services/read-product.service';
import { UpdateProductService } from './application/services/update-product.service';
import { DeleteProductService } from './application/services/delete-product.service';
import { PrismaModule } from '../prisma/primas.module';
import { ProductFactory } from './domain/factories/product.factory';
import * as constants from 'src/shared/domain/constants';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';
import { ProductController } from './products.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    // Serviços
    InsertProductService,
    ReadProductService,
    UpdateProductService,
    DeleteProductService,

    // Dependências injetáveis
    {
      provide: constants.IProductFactoryToken,
      useClass: ProductFactory,
    },
    {
      provide: constants.IProductRepositoryToken,
      useClass: PrismaProductRepository,
    },
    {
      provide: constants.IInsertProductServiceToken,
      useClass: InsertProductService,
    },
    {
      provide: constants.IUpdateProductServiceToken,
      useClass: UpdateProductService,
    },
    {
      provide: constants.IDeleteProductServiceToken,
      useClass: DeleteProductService,
    },
    {
      provide: constants.IReadProductServiceToken,
      useClass: ReadProductService,
    },
  ],
  exports: [
    InsertProductService,
    ReadProductService,
    UpdateProductService,
    DeleteProductService,
  ],
})
export class ProductsModule {}
