import { Product } from '../entities/product.entity';

export interface IProductFactory {
  makeNew(
    typeProduct: string,
    name: string,
    description: string,
    price: number,
    stock: number,
  ): Product;

  makeExistent(
    productId: string,
    typeProduct: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    createdAt: Date,
  ): Product;
}
