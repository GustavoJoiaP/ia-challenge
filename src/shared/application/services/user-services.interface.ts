import { User } from '../../domain/entities/user.entity';
import { RequestInsertUserDTO } from '../dto/request/request-user.dto';

export interface IInsertUserService {
  createUser(user: RequestInsertUserDTO): Promise<User>;
}

export interface IReadUserService {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
}

export interface IUpdateUserService {
  updateUser(user: User): Promise<User>;
}

export interface IDeleteUserService {
  deleteUser(id: string): Promise<void>;
}
