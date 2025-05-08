import { CartItem } from '../entities/cartItem.entity';
import { UUID } from 'crypto';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

export interface ICartItemRepository {
  create(cartItem: CartItem): Promise<CartItem>;
  findById(id: UUID): Promise<CartItem | null>;
  findByCart(cart: Cart): Promise<CartItem[]>;
  findByProduct(product: Product): Promise<CartItem[]>;
  findAll(): Promise<CartItem[]>;
  update(cartItem: CartItem): Promise<CartItem>;
  delete(id: UUID): Promise<boolean>;
}
