import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/shared/domain/entities/user.entity';
import { IUserFactory } from 'src/shared/domain/factories/user-factory.interface';
import { InvalidDatasError } from '../erros/invalid-data.error';

export class UserFactory implements IUserFactory {
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidDatasError();
    }
  }

  private validatePassword(password: string): void {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new InvalidDatasError();
    }
  }

  makeNew(email: string, password: string): User {
    try {
      this.validateEmail(email);
      this.validatePassword(password);

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
      this.validateEmail(email);
      this.validatePassword(password);

      const now = new Date();
      return new User(userId, email, password, createAt, now);
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }
}
