import { TypeProduct } from '../entities/type-product.entity';

export interface ITypeProductFactory {
  makeNew(name: string, description: string): TypeProduct;
  makeExistent(
    typeProductId: string,
    name: string,
    description: string,
    createAt: Date,
  ): TypeProduct;
} 