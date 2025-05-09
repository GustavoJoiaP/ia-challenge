import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/shared/domain/entities/user.entity';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';

export class UserFactory implements IUserFactory {
  makeNew(email: string, password: string): User {
    try {
      const userId = uuidv4();
      const now = new Date();
      return new User(userId, email, password, now, now);
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }

  makeExistent(
    userId: string,
    email: string,
    password: string,
    createAt: Date,
  ): User {
    try {
      const now = new Date();
      return new User(userId, email, password, createAt, now);
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }
}
