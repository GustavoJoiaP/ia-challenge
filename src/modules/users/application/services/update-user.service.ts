import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import { User } from 'src/shared/domain/entities/user.entity';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IUpdateUserService } from 'src/shared/application/services/user-services.interface';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }
}
