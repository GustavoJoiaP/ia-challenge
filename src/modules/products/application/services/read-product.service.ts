import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import {
  IProductFactoryToken,
  IProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IReadProductService } from 'src/shared/application/services/product-services.interface';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class ReadProductService implements IReadProductService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,

    @Inject(IProductFactoryToken)
    private readonly productFactory: IProductFactory,
  ) {}

  async findProductById(id: string): Promise<ResponseProductDTO | null> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) return null;
      return new ResponseProductDTO(product);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }

  async findProductByName(name: string): Promise<ResponseProductDTO | null> {
    try {
      const product = await this.productRepository.findByName(name);
      if (!product) return null;
      return new ResponseProductDTO(product);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }

  async findAllProducts(): Promise<ResponseProductDTO[]> {
    try {
      const products = await this.productRepository.findAll();
      return products.map((product) => new ResponseProductDTO(product));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
