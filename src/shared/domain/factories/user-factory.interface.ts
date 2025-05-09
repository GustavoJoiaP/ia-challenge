import { User } from '../entities/user.entity';

export interface IUserFactory {
  makeNew(email: string, password: string): User;
  makeExistent(
    userId: string,
    email: string,
    password: string,
    createAt: Date,
  ): User;
}
