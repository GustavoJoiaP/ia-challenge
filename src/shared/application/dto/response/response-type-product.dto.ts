import { TypeProduct } from '../../../domain/entities/type-product.entity';

export class ResponseTypeProductDTO {
  id: string;
  name: string;
  description: string;
  createAt: Date;

  constructor(typeProduct: TypeProduct) {
    this.id = typeProduct.id;
    this.name = typeProduct.name;
    this.description = typeProduct.description;
    this.createAt = typeProduct.createAt;
  }
}
