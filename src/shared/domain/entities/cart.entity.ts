import { UUID } from 'node:crypto';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

export class Cart {
  public cartId: UUID;
  public itens: CartItem[];
  public productsQuantity: number;
  public code: number;
  public User: User;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: UUID,
    public cartItens: CartItem[] = [],
    public codeCart: number,
    public user: User,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.cartId = id;
    this.itens = cartItens;
    this.code = codeCart;
    this.User = user;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
