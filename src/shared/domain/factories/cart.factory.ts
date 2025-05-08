import { Cart } from '../entities/cart.entity';
import { UUID } from 'crypto';
import { User } from '../entities/user.entity';
import { CartItem } from '../entities/cartItem.entity';

export interface ICartFactory {
  makeNew(user: User, code: number): Cart;

  makeExistent(
    cartId: UUID,
    items: CartItem[],
    code: number,
    user: User,
    createdAt: Date,
    updatedAt: Date,
  ): Cart;
}
