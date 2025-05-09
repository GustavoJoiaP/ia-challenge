import { Product } from '../entities/product.entity';
import { UUID } from 'crypto';
import { TypeProduct } from '../entities/typeProduct.entity';

export interface IProductFactory {
  makeNew(
    typeProduct: TypeProduct,
    name: string,
    description: string,
    price: number,
    stock: number,
  ): Product;

  makeExistent(
    productId: UUID,
    typeProduct: TypeProduct,
    name: string,
    description: string,
    price: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
  ): Product;
}
