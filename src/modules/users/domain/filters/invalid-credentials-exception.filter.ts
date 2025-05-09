import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { InvalidCredentialsError } from '../erros/invalid-credentials.error';

@Catch(InvalidCredentialsError)
export class InvalidCredentialsExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.UNAUTHORIZED;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
