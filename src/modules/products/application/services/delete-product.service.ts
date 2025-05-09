import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IDeleteProductService } from 'src/shared/application/services/product-services.interface';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class DeleteProductService implements IDeleteProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly productFactory: IProductFactory,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
