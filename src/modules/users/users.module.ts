import { Module } from '@nestjs/common';
import { InsertUserService } from './application/services/insert-user.service';
import { ReadUserService } from './application/services/read-user.service';
import { UpdateUserService } from './application/services/update-user.service';
import { DeleteUserService } from './application/services/delete-user.service';
import { PrismaModule } from '../prisma/primas.module';
import { UserFactory } from './domain/factories/user.factory';
import * as constants from 'src/shared/domain/constants';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
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
    {
      provide: constants.IInsertUserServiceToken,
      useClass: InsertUserService,
    },
    {
      provide: constants.IUpdateUserServiceToken,
      useClass: UpdateUserService,
    },
    {
      provide: constants.IDeleteUserServiceToken,
      useClass: DeleteUserService,
    },
    {
      provide: constants.IReadUserServiceToken,
      useClass: ReadUserService,
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
