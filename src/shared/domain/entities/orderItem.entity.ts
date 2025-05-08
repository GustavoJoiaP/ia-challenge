import { UUID } from 'crypto';
import { Product } from './product.entity';

export class OrderItem {
  public orderItemId: UUID;
  public Product: Product;
  public quantity: number;
  public price: number;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: UUID,
    public product: Product,
    public quantityProduct: number,
    public priceAmount: number,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.orderItemId = id;
    this.Product = product;
    this.quantity = quantityProduct;
    this.price = priceAmount;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
