import { UUID } from 'node:crypto';

export class TypeProduct {
  public typeProductId: UUID;
  public name: string;
  public description: string;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public id: UUID,
    public typeProductName: string,
    public typeProductDescription: string,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.typeProductId = id;
    this.name = typeProductName;
    this.description = typeProductDescription;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
