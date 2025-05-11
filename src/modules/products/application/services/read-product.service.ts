import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import { InvalidDatasError } from 'src/shared/domain/erros/invalid-data.error';

@Injectable()
export class ReadProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly userFactory: IProductFactory,
  ) {}

  async findById(id: string): Promise<ResponseProductDTO | null> {
    const product = await this.productRepository.findById(id);
    if (!product) return null;

    const responseProduct = new ResponseProductDTO();
    responseProduct.id = product.id;
    responseProduct.name = product.name;
    responseProduct.description = product.description;
    responseProduct.price = product.price;
    responseProduct.stock = product.stock;
    responseProduct.typeProductId = product.typeProduct;
    responseProduct.createdAt = product.createdAt;
    return responseProduct;
  }

  async findByName(name: string): Promise<ResponseProductDTO[] | null> {
    try {
      const products = await this.productRepository.findByName(name);
      if (!products) return [];

      return products.map((product) => {
        const responseProduct = new ResponseProductDTO();
        responseProduct.id = product.id;
        responseProduct.name = product.name;
        responseProduct.description = product.description;
        responseProduct.price = product.price;
        responseProduct.stock = product.stock;
        responseProduct.typeProductId = product.typeProduct;
        responseProduct.createdAt = product.createdAt;
        return responseProduct;
      });
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }

  async findByType(typeProduct: string): Promise<ResponseProductDTO[] | null> {
    const products = await this.productRepository.findByType(typeProduct);
    if (!products) return [];
    return products.map((product) => {
      const responseProduct = new ResponseProductDTO();
      responseProduct.id = product.id;
      responseProduct.name = product.name;
      responseProduct.description = product.description;
      responseProduct.price = product.price;
      responseProduct.stock = product.stock;
      responseProduct.typeProductId = product.typeProduct;
      responseProduct.createdAt = product.createdAt;
      return responseProduct;
    });
  }

  async findAll(): Promise<ResponseProductDTO[] | null> {
    const products = await this.productRepository.findAll();
    return products.map((product) => {
      const responseProduct = new ResponseProductDTO();
      responseProduct.id = product.id;
      responseProduct.name = product.name;
      responseProduct.description = product.description;
      responseProduct.price = product.price;
      responseProduct.stock = product.stock;
      responseProduct.typeProductId = product.typeProduct;
      responseProduct.createdAt = product.createdAt;
      return responseProduct;
    });
  }
}
