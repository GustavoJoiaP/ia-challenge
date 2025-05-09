import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import { User } from 'src/shared/domain/entities/user.entity';
import {
  IUserFactoryToken,
  IUserRepositoryToken,
} from 'src/shared/domain/constants';
import { IInsertUserService } from 'src/shared/application/services/user-services.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestInsertUserDTO } from 'src/shared/application/dto/request/request-user.dto';

@Injectable()
export class InsertUserService implements IInsertUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IUserFactoryToken)
    private readonly userFactory: IUserFactory,
  ) {}
  createUser(user: RequestInsertUserDTO): Promise<User> {
    try {
      const newUser = this.userFactory.makeNew(user.email, user.password);
      return this.userRepository.create(newUser);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
