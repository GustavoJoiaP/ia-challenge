export class User {
  public id: string;
  public email: string;
  public hash: string;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public userId: string,
    public emailUser: string,
    public passwordHash: string,
    public dateCreation: Date,
    public dateUpdate: Date,
  ) {
    this.id = userId;
    this.email = emailUser;
    this.hash = passwordHash;
    this.createAt = dateCreation;
    this.updateAt = dateUpdate;
  }
}
