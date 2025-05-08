import { Order } from '../entities/order.entity';
import { UUID } from 'crypto';
import { User } from '../entities/user.entity';
import { OrderStatus } from '../entities/enuns/OrderStatus';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: UUID): Promise<Order | null>;
  findByUser(user: User): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  delete(id: UUID): Promise<boolean>;
}
