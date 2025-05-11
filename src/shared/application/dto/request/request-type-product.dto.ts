export class RequestInsertTypeProductDTO {
  name: string;
  description: string;
}
export class RequestUpdateTypeProductDTO {
  id: string;
  name: string;
  description: string;
  typeProductId: string;
  createdAt: Date;
  updatedAt: Date;
}
