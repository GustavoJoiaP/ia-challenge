import { TypeProduct } from '../entities/type-product.entity';

export const TYPE_PRODUCT_REPOSITORY = 'TYPE_PRODUCT_REPOSITORY';

export interface ITypeProductRepository {
  create(typeProduct: TypeProduct): Promise<TypeProduct>;
  findById(id: string): Promise<TypeProduct | null>;
  findByName(name: string): Promise<TypeProduct | null>;
  findAll(): Promise<TypeProduct[]>;
  update(typeProduct: TypeProduct): Promise<TypeProduct>;
  delete(id: string): Promise<void>;
}
