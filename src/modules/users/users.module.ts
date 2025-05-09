import { Module } from '@nestjs/common';
import { InsertUserService } from './application/services/insert-user.service';
import { ReadUserService } from './application/services/read-user.service';
import { UpdateUserService } from './application/services/update-user.service';
import { DeleteUserService } from './application/services/delete-user.service';
import { PrismaModule } from '../prisma/primas.module';
import { UserFactory } from './domain/factories/user.factory';
import * as constants from 'src/shared/domain/constants';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    // Serviços
    InsertUserService,
    ReadUserService,
    UpdateUserService,
    DeleteUserService,

    // Dependências injetáveis
    {
      provide: constants.IUserFactoryToken,
      useClass: UserFactory,
    },
    {
      provide: constants.IUserRepositoryToken,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    InsertUserService,
    ReadUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
