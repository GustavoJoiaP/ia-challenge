import { Product } from '../entities/product.entity';
import { UUID } from 'crypto';
import { TypeProduct } from '../entities/typeProduct.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: UUID): Promise<Product | null>;
  findByName(name: string): Promise<Product[]>;
  findByType(typeProduct: TypeProduct): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: UUID): Promise<boolean>;
}
