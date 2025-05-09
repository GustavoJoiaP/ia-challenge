import { TypeProduct } from './typeProduct.entity';

export class Product {
  public productId: string;
  public name: string;
  public description: string;
  public TypeProduct: string;
  public price: number;
  public stock: number;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: string,
    public typeProduct: string,
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
