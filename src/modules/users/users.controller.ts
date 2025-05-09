import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserService } from './application/services/insert-user.service';
import { RequestInsertUserDTO } from 'src/shared/application/dto/request/request-user.dto';

@Controller('user')
export class UserController {
  constructor(private insertUserService: InsertUserService) {}

  @Post('insert')
  signup(@Body() dto: RequestInsertUserDTO) {
    return this.insertUserService.createUser(dto);
  }
}
