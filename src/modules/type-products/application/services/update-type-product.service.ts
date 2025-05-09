import { Injectable, Inject } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import { TypeProduct } from 'src/shared/domain/entities/type-product.entity';
import {
  ITypeProductFactoryToken,
  ITypeProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IUpdateTypeProductService } from 'src/shared/application/services/type-product-services.interface';
import { ResponseTypeProductDTO } from 'src/shared/application/dto/response/response-type-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class UpdateTypeProductService implements IUpdateTypeProductService {
  constructor(
    @Inject(ITypeProductRepositoryToken)
    private readonly typeProductRepository: ITypeProductRepository,

    @Inject(ITypeProductFactoryToken)
    private readonly typeProductFactory: ITypeProductFactory,
  ) {}

  async updateTypeProduct(
    typeProduct: TypeProduct,
  ): Promise<ResponseTypeProductDTO> {
    try {
      const updatedTypeProduct =
        await this.typeProductRepository.update(typeProduct);
      return new ResponseTypeProductDTO(updatedTypeProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
