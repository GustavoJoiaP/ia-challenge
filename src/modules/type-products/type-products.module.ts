import { Module } from '@nestjs/common';
import { InsertTypeProductService } from './application/services/insert-type-product.service';
import { PrismaModule } from '../prisma/primas.module';
import { TypeProductFactory } from './domain/factories/type-product.factory';
import * as constants from 'src/shared/domain/constants';
import { PrismaTypeProductRepository } from './infrastructure/repositories/prisma-type-product.repository';
import { TypeProductsController } from './type-products.controller';
import { ReadTypeProductService } from './application/services/read-type-product.service';
import { UpdateTypeProductService } from './application/services/update-type-product.service';
import { DeleteTypeProductService } from './application/services/delete-type-product.service';

@Module({
  imports: [PrismaModule],
  controllers: [TypeProductsController],
  providers: [
    // Serviços
    InsertTypeProductService,
    ReadTypeProductService,
    UpdateTypeProductService,
    DeleteTypeProductService,

    // Dependências injetáveis
    {
      provide: constants.ITypeProductFactoryToken,
      useClass: TypeProductFactory,
    },
    {
      provide: constants.ITypeProductRepositoryToken,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: PrismaTypeProductRepository,
    },
    {
      provide: constants.IInsertTypeProductServiceToken,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: InsertTypeProductService,
    },
    {
      provide: constants.IUpdateTypeProductServiceToken,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: UpdateTypeProductService,
    },
    {
      provide: constants.IDeleteTypeProductServiceToken,
      useClass: DeleteTypeProductService,
    },
    {
      provide: constants.IReadTypeProductServiceToken,
      useClass: ReadTypeProductService,
    },
  ],
  exports: [
    InsertTypeProductService,
    ReadTypeProductService,
    UpdateTypeProductService,
    DeleteTypeProductService,
  ],
})
export class TypeProductsModule {}
