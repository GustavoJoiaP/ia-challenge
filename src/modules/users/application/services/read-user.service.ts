import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import { User } from 'src/shared/domain/entities/user.entity';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IReadUserService } from 'src/shared/application/services/user-services.interface';

@Injectable()
export class ReadUserService implements IReadUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
