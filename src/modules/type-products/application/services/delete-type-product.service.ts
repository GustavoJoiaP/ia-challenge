import { Injectable, Inject } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import {
  ITypeProductFactoryToken,
  ITypeProductRepositoryToken,
} from 'src/shared/domain/constants';
import { IDeleteTypeProductService } from 'src/shared/application/services/type-product-services.interface';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

@Injectable()
export class DeleteTypeProductService implements IDeleteTypeProductService {
  constructor(
    @Inject(ITypeProductRepositoryToken)
    private readonly typeProductRepository: ITypeProductRepository,

    @Inject(ITypeProductFactoryToken)
    private readonly typeProductFactory: ITypeProductFactory,
  ) {}

  async deleteTypeProduct(id: string): Promise<void> {
    try {
      await this.typeProductRepository.delete(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidDatasError();
    }
  }
}
