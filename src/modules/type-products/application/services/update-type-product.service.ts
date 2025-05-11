import { Injectable, Inject } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import {
  ITypeProductFactoryToken,
  ITypeProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IUpdateTypeProductService } from 'src/shared/application/services/type-product-services.interface';
import { ResponseTypeProductDTO } from 'src/shared/application/dto/response/response-type-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';
import { RequestUpdateTypeProductDTO } from 'src/shared/application/dto/request/request-type-product.dto';

@Injectable()
export class UpdateTypeProductService implements IUpdateTypeProductService {
  constructor(
    @Inject(ITypeProductRepositoryToken)
    private readonly typeProductRepository: ITypeProductRepository,

    @Inject(ITypeProductFactoryToken)
    private readonly typeProductFactory: ITypeProductFactory,
  ) {}

  async updateTypeProduct(
    typeProduct: RequestUpdateTypeProductDTO,
  ): Promise<ResponseTypeProductDTO> {
    try {
      const existentTypeProduct = this.typeProductFactory.makeExistent(
        typeProduct.id,
        typeProduct.name,
        typeProduct.description,
        typeProduct.createdAt,
      );
      const updatedTypeProduct =
        await this.typeProductRepository.update(existentTypeProduct);
      return new ResponseTypeProductDTO(updatedTypeProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
