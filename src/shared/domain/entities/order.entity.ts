import { UUID } from 'crypto';
import { User } from './user.entity';
import { OrderItem } from './orderItem.entity';
import { OrderStatus } from './enuns/OrderStatus';

export interface IOrder {
  orderId: UUID;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  code: number;
  createdAt: Date;
}

export type OrderProps = {
  id: UUID;
  user: User;
  itemsOrder: OrderItem[];
  codeOrder: number;
  orderStatus?: OrderStatus;
  dateCreate: Date;
};

export class Order implements IOrder {
  public readonly orderId: UUID;
  public readonly user: User;
  public readonly items: OrderItem[];
  public readonly code: number;
  public status: OrderStatus;
  public readonly createdAt: Date;

  constructor(props: OrderProps) {
    this.orderId = props.id;
    this.user = props.user;
    this.items = props.itemsOrder;
    this.code = props.codeOrder;
    this.status = props.orderStatus ?? OrderStatus.PENDING;
    this.createdAt = props.dateCreate;
  }

  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }
}
