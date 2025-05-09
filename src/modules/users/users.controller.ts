import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserService } from './application/services/insert-user.service';
import { RequestInsertUserDTO } from 'src/shared/application/dto/request/request-user.dto';

@Controller('users')
export class UserController {
  constructor(private insertUserService: InsertUserService) {}

  @Post('insert')
  signup(@Body() dto: RequestInsertUserDTO) {
    console.log('dto', dto);
    return this.insertUserService.createUser(dto);
  }
}
