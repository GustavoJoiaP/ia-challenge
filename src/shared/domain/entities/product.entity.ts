import { UUID } from 'node:crypto';
import { TypeProduct } from './typeProduct.entity';

export class Product {
  public productId: UUID;
  public name: string;
  public description: string;
  public TypeProduct: TypeProduct;
  public price: number;
  public stock: number;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: UUID,
    public typeProduct: TypeProduct,
    public typeProductName: string,
    public typeProductDescription: string,
    public amountPrice: number,
    public amountStock: number,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.productId = id;
    this.TypeProduct = typeProduct;
    this.name = typeProductName;
    this.description = typeProductDescription;
    this.price = amountPrice;
    this.stock = amountStock;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
