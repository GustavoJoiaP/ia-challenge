export class RequestInsertProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  typeProductId: string;
}

export class RequestUpdateProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  typeProductId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}