export class TypeProduct {
  public id: string;
  public name: string;
  public description: string;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public typeProductId: string,
    public typeProductName: string,
    public typeProductDescription: string,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.id = typeProductId;
    this.name = typeProductName;
    this.description = typeProductDescription;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
