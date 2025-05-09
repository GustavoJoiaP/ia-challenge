export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public typeProductId: string;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public productId: string,
    public productName: string,
    public productDescription: string,
    public productPrice: number,
    public productStock: number,
    public productTypeId: string,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.id = productId;
    this.name = productName;
    this.description = productDescription;
    this.price = productPrice;
    this.stock = productStock;
    this.typeProductId = productTypeId;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
