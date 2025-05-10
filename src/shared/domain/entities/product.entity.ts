export class Product {
  constructor(
    public id: string,
    public typeProduct: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
