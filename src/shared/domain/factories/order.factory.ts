import { Order } from '../entities/order.entity';
import { UUID } from 'crypto';
import { User } from '../entities/user.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { OrderStatus } from '../entities/enuns/OrderStatus';

export interface IOrderFactory {
  makeNew(user: User, items: OrderItem[], code: number): Order;

  makeExistent(
    orderId: UUID,
    user: User,
    items: OrderItem[],
    code: number,
    status: OrderStatus,
    createdAt: Date,
  ): Order;
}
