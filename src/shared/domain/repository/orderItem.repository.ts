import { OrderItem } from '../entities/orderItem.entity';
import { UUID } from 'crypto';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

export interface IOrderItemRepository {
  create(orderItem: OrderItem): Promise<OrderItem>;
  findById(id: UUID): Promise<OrderItem | null>;
  findByOrder(order: Order): Promise<OrderItem[]>;
  findByProduct(product: Product): Promise<OrderItem[]>;
  findAll(): Promise<OrderItem[]>;
  update(orderItem: OrderItem): Promise<OrderItem>;
  delete(id: UUID): Promise<boolean>;
}
