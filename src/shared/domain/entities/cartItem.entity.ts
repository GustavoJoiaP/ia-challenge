import { UUID } from 'node:crypto';
import { Product } from './product.entity';

export class CartItem {
  public cartItemId: UUID;
  public Product: Product;
  public quantity: number;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: UUID,
    public product: Product,
    public amount: number,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.cartItemId = id;
    this.Product = product;
    this.quantity = amount;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
