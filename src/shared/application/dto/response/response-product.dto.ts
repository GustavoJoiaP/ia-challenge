import { Product } from '../../../domain/entities/product.entity';

export class ResponseProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  typeProductId: string;
  createAt: Date;
  updateAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.typeProductId = product.typeProductId;
    this.createAt = product.createAt;
    this.updateAt = product.updateAt;
  }
}
