import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/shared/domain/repository/user-repository.interface';
import { User } from 'src/shared/domain/entities/user.entity';
import { RepositoryError } from 'src/shared/domain/errors/repository.error';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  private readonly entity = 'User';

  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const createdUser = await this.prisma.user.create({
        data: {
          email: user.email,
          hash: user.hash,
        },
      });

      return new User(
        createdUser.id,
        createdUser.email,
        createdUser.hash,
        createdUser.createdAt,
        createdUser.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao criar usuário: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) return null;

      return new User(
        user.id,
        user.email,
        user.hash,
        user.createdAt,
        user.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar usuário por ID: ${error.message}`,
        'findById',
        this.entity,
        error as Error,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      return new User(
        user.id,
        user.email,
        user.hash,
        user.createdAt,
        user.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar usuário por email: ${error.message}`,
        'findByEmail',
        this.entity,
        error as Error,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const users = await this.prisma.user.findMany();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return users.map(
        (user) =>
          new User(
            user.id,
            user.email,
            user.hash,
            user.createdAt,
            user.updatedAt,
          ),
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar todos os usuários: ${error.message}`,
        'findAll',
        this.entity,
        error as Error,
      );
    }
  }

  async update(user: User): Promise<User> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          hash: user.hash,
        },
      });

      return new User(
        updatedUser.id,
        updatedUser.email,
        updatedUser.hash,
        updatedUser.createdAt,
        updatedUser.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao atualizar usuário: ${error.message}`,
        'update',
        this.entity,
        error as Error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao deletar usuário: ${error.message}`,
        'delete',
        this.entity,
        error as Error,
      );
    }
  }
}
