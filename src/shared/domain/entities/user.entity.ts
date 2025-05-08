import { UUID } from 'crypto';

export class User {
  public id: UUID;
  public email: string;
  public hash: string;
  public createAt: Date;
  public updateAt: Date;

  constructor(
    public userId: UUID,
    public emailUser: string,
    public passwordHash: string,
    public dateCreation: Date,
    public dateUdpate: Date,
  ) {
    this.id = userId;
    this.email = emailUser;
    this.hash = passwordHash;
    this.createAt = dateCreation;
    this.updateAt = this.dateUdpate;
  }
}
