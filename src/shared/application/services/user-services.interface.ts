import { User } from '../../domain/entities/user.entity';
import { RequestInsertUserDTO } from '../dto/request/request-user.dto';
import {
  ResponseFindUserDTO,
  ResponseInsertUserDTO,
} from '../dto/response/response-user.dto';

export interface IInsertUserService {
  createUser(user: RequestInsertUserDTO): Promise<ResponseInsertUserDTO>;
}

export interface IReadUserService {
  findUserById(id: string): Promise<ResponseFindUserDTO | null>;
  findUserByEmail(email: string): Promise<ResponseFindUserDTO | null>;
  findAllUsers(): Promise<ResponseFindUserDTO[]>;
}

export interface IUpdateUserService {
  updateUser(user: User): Promise<ResponseInsertUserDTO>;
}

export interface IDeleteUserService {
  deleteUser(id: string): Promise<void>;
}
