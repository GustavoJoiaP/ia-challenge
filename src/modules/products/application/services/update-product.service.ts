import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { RequestUpdateProductDTO } from 'src/shared/application/dto/request/request-product.dto';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';
import { InvalidDatasError } from 'src/shared/domain/erros/invalid-data.error';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly productFactory: IProductFactory,
  ) {}

  async updateProduct(
    product: RequestUpdateProductDTO,
  ): Promise<ResponseProductDTO> {
    try {
      const existingProduct = await this.productRepository.findById(product.id);
      if (!existingProduct) {
        throw new InvalidDatasError();
      }

      const updatedProduct = this.productFactory.makeExistent(
        product.id,
        product.typeProductId,
        product.name,
        product.description,
        product.price,
        product.stock,
        existingProduct.createdAt,
      );

      const result = await this.productRepository.update(updatedProduct);
      const responseProduct = new ResponseProductDTO();
      responseProduct.name = result.name;
      responseProduct.description = result.description;
      responseProduct.price = result.price;
      responseProduct.stock = result.stock;
      responseProduct.typeProductId = result.typeProduct;
      responseProduct.createdAt = result.createdAt;
      responseProduct.updatedAt = result.updatedAt;
      return responseProduct;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
