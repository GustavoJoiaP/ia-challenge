import { Injectable, Inject } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import {
  ITypeProductFactoryToken,
  ITypeProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IInsertTypeProductService } from 'src/shared/application/services/type-product-services.interface';
import { RequestInsertTypeProductDTO } from 'src/shared/application/dto/request/request-type-product.dto';
import { ResponseTypeProductDTO } from 'src/shared/application/dto/response/response-type-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class InsertTypeProductService implements IInsertTypeProductService {
  constructor(
    @Inject(ITypeProductRepositoryToken)
    private readonly typeProductRepository: ITypeProductRepository,

    @Inject(ITypeProductFactoryToken)
    private readonly typeProductFactory: ITypeProductFactory,
  ) {}

  async createTypeProduct(
    typeProduct: RequestInsertTypeProductDTO,
  ): Promise<ResponseTypeProductDTO> {
    try {
      const newTypeProduct = this.typeProductFactory.makeNew(
        typeProduct.name,
        typeProduct.description,
      );
      const createdTypeProduct =
        await this.typeProductRepository.create(newTypeProduct);
      return new ResponseTypeProductDTO(createdTypeProduct);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
