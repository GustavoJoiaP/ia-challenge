import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IReadUserService } from 'src/shared/application/services/user-services.interface';
import { ResponseFindUserDTO } from 'src/shared/application/dto/response/response-user.dto';
import { InvalidDatasError } from '../../domain/erros/invalid-data.error';
import { RepositoryError } from 'src/shared/domain/errors/repository.error';

@Injectable()
export class ReadUserService implements IReadUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}

  async findUserById(id: string): Promise<ResponseFindUserDTO | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user)
        throw new RepositoryError('User not found', 'findUserById', 'User');

      const responseUser = new ResponseFindUserDTO();
      responseUser.id = user.id;
      responseUser.email = user.email;
      responseUser.createdAt = user.createAt;
      return responseUser;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }

  async findUserByEmail(email: string): Promise<ResponseFindUserDTO | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user)
        throw new RepositoryError('User not found', 'findUserByEmail', 'User');

      const responseUser = new ResponseFindUserDTO();
      responseUser.id = user.id;
      responseUser.email = user.email;
      responseUser.createdAt = user.createAt;
      return responseUser;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }

  async findAllUsers(): Promise<ResponseFindUserDTO[]> {
    try {
      const users = await this.userRepository.findAll();
      if (!users)
        throw new RepositoryError('User not found', 'findAllUsers', 'User');

      const responseUsers = users.map((user) => {
        const responseUser = new ResponseFindUserDTO();
        responseUser.id = user.id;
        responseUser.email = user.email;
        responseUser.createdAt = user.createAt;
        return responseUser;
      });
      return responseUsers;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
