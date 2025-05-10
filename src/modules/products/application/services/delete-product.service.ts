import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductRepositoryToken } from 'src/shared/domain/constants';
import { InvalidDatasError } from 'src/shared/domain/erros/invalid-data.error';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    try {
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new InvalidDatasError();
      }
      await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}