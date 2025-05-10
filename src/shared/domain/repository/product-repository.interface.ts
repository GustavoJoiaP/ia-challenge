import { Product } from 'src/shared/domain/entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByName(name: string): Promise<Product[] | null>;
  findByType(typeProduct: string): Promise<Product[] | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<boolean>;
}