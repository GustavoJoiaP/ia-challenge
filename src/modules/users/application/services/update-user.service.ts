import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import { User } from 'src/shared/domain/entities/user.entity';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IUpdateUserService } from 'src/shared/application/services/user-services.interface';
import { ResponseInsertUserDTO } from 'src/shared/application/dto/response/response-user.dto';
import { InvalidDatasError } from '../../domain/erros/invalid-data.error';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}

  async updateUser(user: User): Promise<ResponseInsertUserDTO> {
    try {
      const updatedUser = await this.userRepository.update(user);
      const responseUser = new ResponseInsertUserDTO();
      responseUser.email = updatedUser.email;
      responseUser.createdAt = updatedUser.createAt;
      return responseUser;
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new InvalidDatasError();
      }
      throw new InvalidDatasError();
    }
  }
}
