import { TypeProduct } from '../entities/typeProduct.entity';
import { UUID } from 'crypto';

export interface ITypeProductFactory {
  makeNew(name: string, description: string): TypeProduct;

  makeExistent(
    typeProductId: UUID,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ): TypeProduct;
}
