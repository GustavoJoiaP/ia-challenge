import { TypeProduct } from '../entities/typeProduct.entity';
import { UUID } from 'crypto';

export interface ITypeProductRepository {
  create(typeProduct: TypeProduct): Promise<TypeProduct>;
  findById(id: UUID): Promise<TypeProduct | null>;
  findByName(name: string): Promise<TypeProduct[]>;
  findAll(): Promise<TypeProduct[]>;
  update(typeProduct: TypeProduct): Promise<TypeProduct>;
  delete(id: UUID): Promise<boolean>;
}
