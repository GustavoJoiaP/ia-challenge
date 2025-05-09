import { Injectable, Inject } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import {
  ITypeProductFactoryToken,
  ITypeProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IReadTypeProductService } from 'src/shared/application/services/type-product-services.interface';
import { ResponseTypeProductDTO } from 'src/shared/application/dto/response/response-type-product.dto';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class ReadTypeProductService implements IReadTypeProductService {
  constructor(
    @Inject(ITypeProductRepositoryToken)
    private readonly typeProductRepository: ITypeProductRepository,

    @Inject(ITypeProductFactoryToken)
    private readonly typeProductFactory: ITypeProductFactory,
  ) {}

  async findTypeProductById(
    id: string,
  ): Promise<ResponseTypeProductDTO | null> {
    try {
      const typeProduct = await this.typeProductRepository.findById(id);
      if (!typeProduct) return null;
      return new ResponseTypeProductDTO(typeProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }

  async findTypeProductByName(
    name: string,
  ): Promise<ResponseTypeProductDTO | null> {
    try {
      const typeProduct = await this.typeProductRepository.findByName(name);
      if (!typeProduct) return null;
      return new ResponseTypeProductDTO(typeProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }

  async findAllTypeProducts(): Promise<ResponseTypeProductDTO[]> {
    try {
      const typeProducts = await this.typeProductRepository.findAll();
      return typeProducts.map(
        (typeProduct) => new ResponseTypeProductDTO(typeProduct),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
