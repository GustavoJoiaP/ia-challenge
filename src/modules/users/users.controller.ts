import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestInsertUserDTO } from 'src/shared/application/dto/request/request-user.dto';
import {
  IDeleteUserService,
  IInsertUserService,
  IReadUserService,
  IUpdateUserService,
} from 'src/shared/application/services/user-services.interface';
import {
  IDeleteUserServiceToken,
  IInsertUserServiceToken,
  IReadUserServiceToken,
  IUpdateUserServiceToken,
} from 'src/shared/domain/constants';
import { InvalidDatasError } from './domain/erros/invalid-data.error';
import { User } from 'src/shared/domain/entities/user.entity';
import {
  ResponseFindUserDTO,
  ResponseInsertUserDTO,
} from 'src/shared/application/dto/response/response-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IInsertUserServiceToken)
    private readonly insertUserService: IInsertUserService,

    @Inject(IUpdateUserServiceToken)
    private readonly updateUserService: IUpdateUserService,

    @Inject(IDeleteUserServiceToken)
    private readonly deleteUserService: IDeleteUserService,

    @Inject(IReadUserServiceToken)
    private readonly readUserService: IReadUserService,
  ) {}

  @Post('insert')
  async signup(@Body() dto: RequestInsertUserDTO) {
    try {
      return await this.insertUserService.createUser(dto);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new HttpException(error.message, HttpStatus.CONTENT_DIFFERENT);
      }
      throw new InternalServerErrorException('Error to create user.');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseFindUserDTO | null> {
    try {
      return await this.readUserService.findUserById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to find user.');
    }
  }

  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<ResponseFindUserDTO | null> {
    try {
      return await this.readUserService.findUserByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to find user by email.');
    }
  }

  @Get()
  async findAll(): Promise<ResponseFindUserDTO[]> {
    try {
      console.log('aqui');
      return await this.readUserService.findAllUsers();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to find all users.');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<ResponseInsertUserDTO> {
    try {
      return await this.updateUserService.updateUser(user);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new HttpException(error.message, HttpStatus.CONTENT_DIFFERENT);
      }
      throw new InternalServerErrorException('Error to update user.');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    try {
      await this.deleteUserService.deleteUser(id);
      return 'User deleted successfully';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to delete user.');
    }
  }
}
