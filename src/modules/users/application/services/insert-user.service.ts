import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IInsertUserService } from 'src/shared/application/services/user-services.interface';
import { RequestInsertUserDTO } from 'src/shared/application/dto/request/request-user.dto';
import { InvalidDatasError } from '../../domain/erros/invalid-data.error';
import { ResponseInsertUserDTO } from 'src/shared/application/dto/response/response-user.dto';

@Injectable()
export class InsertUserService implements IInsertUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}
  async createUser(user: RequestInsertUserDTO): Promise<ResponseInsertUserDTO> {
    try {
      const newUser = this.userFactory.makeNew(user.email, user.password);
      const createdUser = await this.userRepository.create(newUser);
      const responseUser = new ResponseInsertUserDTO();
      responseUser.email = createdUser.email;
      responseUser.createdAt = createdUser.createAt;
      return responseUser;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
