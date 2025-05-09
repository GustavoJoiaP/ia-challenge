import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IInsertProductService } from 'src/shared/application/services/product-services.interface';
import { RequestInsertProductDTO } from 'src/shared/application/dto/request/request-product.dto';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class InsertProductService implements IInsertProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly productFactory: IProductFactory,
  ) {}

  async createProduct(
    product: RequestInsertProductDTO,
  ): Promise<ResponseProductDTO> {
    try {
      const newProduct = this.productFactory.makeNew(
        product.typeProductId,
        product.name,
        product.description,
        product.price,
        product.stock,
      );
      const createdProduct = await this.productRepository.create(newProduct);
      return new ResponseProductDTO(createdProduct);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
