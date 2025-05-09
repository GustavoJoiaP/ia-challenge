import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import { Product } from 'src/shared/domain/entities/product.entity';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IUpdateProductService } from 'src/shared/application/services/product-services.interface';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class UpdateProductService implements IUpdateProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly productFactory: IProductFactory,
  ) {}

  async updateProduct(product: Product): Promise<ResponseProductDTO> {
    try {
      const updatedProduct = await this.productRepository.update(product);
      return new ResponseProductDTO(updatedProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
