import { OrderItem } from '../entities/orderItem.entity';
import { UUID } from 'crypto';
import { Product } from '../entities/product.entity';

export interface IOrderItemFactory {
  makeNew(product: Product, quantity: number, price: number): OrderItem;

  makeExistent(
    orderItemId: UUID,
    product: Product,
    quantity: number,
    price: number,
    createdAt: Date,
    updatedAt: Date,
  ): OrderItem;
}
