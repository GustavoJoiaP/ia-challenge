import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { InvalidDatasError } from 'src/shared/domain/erros/invalid-data.error';
import { RequestInsertProductDTO } from 'src/shared/application/dto/request/request-product.dto';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';

@Injectable()
export class InsertProductService {
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
      const responseProduct = new ResponseProductDTO();
      responseProduct.name = createdProduct.name;
      responseProduct.description = createdProduct.description;
      responseProduct.price = createdProduct.price;
      responseProduct.stock = createdProduct.stock;
      responseProduct.typeProductId = createdProduct.TypeProduct.typeProductId;
      responseProduct.createdAt = createdProduct.createAt;
      return responseProduct;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
