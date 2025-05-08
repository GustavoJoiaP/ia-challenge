import { CartItem } from '../entities/cartItem.entity';
import { UUID } from 'crypto';
import { Product } from '../entities/product.entity';

export interface ICartItemFactory {
  makeNew(product: Product, quantity: number): CartItem;

  makeExistent(
    cartItemId: UUID,
    product: Product,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
  ): CartItem;
}
