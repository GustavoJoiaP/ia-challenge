import { Cart } from '../entities/cart.entity';
import { UUID } from 'crypto';
import { User } from '../entities/user.entity';

export interface ICartRepository {
  create(cart: Cart): Promise<Cart>;
  findById(id: UUID): Promise<Cart | null>;
  findByUser(user: User): Promise<Cart | null>;
  findAll(): Promise<Cart[]>;
  update(cart: Cart): Promise<Cart>;
  delete(id: UUID): Promise<boolean>;
}
