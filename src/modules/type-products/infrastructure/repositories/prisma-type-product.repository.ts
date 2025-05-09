import { Injectable } from '@nestjs/common';
import { ITypeProductRepository } from 'src/shared/domain/repository/type-product-repository.interface';
import { TypeProduct } from 'src/shared/domain/entities/type-product.entity';
import { RepositoryError } from 'src/shared/domain/errors/repository.error';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PrismaTypeProductRepository implements ITypeProductRepository {
  private readonly entity = 'TypeProduct';

  constructor(private readonly prisma: PrismaService) {}

  async create(typeProduct: TypeProduct): Promise<TypeProduct> {
    try {
      const createdTypeProduct = await this.prisma.typeProduct.create({
        data: {
          name: typeProduct.name,
          description: typeProduct.description,
        },
      });

      return new TypeProduct(
        createdTypeProduct.id,
        createdTypeProduct.name,
        createdTypeProduct.description,
        createdTypeProduct.createdAt,
        createdTypeProduct.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao criar tipo de produto: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async findById(id: string): Promise<TypeProduct | null> {
    try {
      const typeProduct = await this.prisma.typeProduct.findUnique({
        where: { id },
      });

      if (!typeProduct) return null;

      return new TypeProduct(
        typeProduct.id,
        typeProduct.name,
        typeProduct.description,
        typeProduct.createdAt,
        typeProduct.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar tipo de produto por ID: ${error.message}`,
        'findById',
        this.entity,
        error as Error,
      );
    }
  }

  async findByName(name: string): Promise<TypeProduct | null> {
    try {
      const typeProduct = await this.prisma.typeProduct.findFirst({
        where: { name },
      });

      if (!typeProduct) return null;

      return new TypeProduct(
        typeProduct.id,
        typeProduct.name,
        typeProduct.description,
        typeProduct.createdAt,
        typeProduct.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar tipo de produto por nome: ${error.message}`,
        'findByName',
        this.entity,
        error as Error,
      );
    }
  }

  async findAll(): Promise<TypeProduct[]> {
    try {
      const typeProducts = await this.prisma.typeProduct.findMany();

      return typeProducts.map(
        (typeProduct) =>
          new TypeProduct(
            typeProduct.id,
            typeProduct.name,
            typeProduct.description,
            typeProduct.createdAt,
            typeProduct.updatedAt,
          ),
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar todos os tipos de produto: ${error.message}`,
        'findAll',
        this.entity,
        error as Error,
      );
    }
  }

  async update(typeProduct: TypeProduct): Promise<TypeProduct> {
    try {
      const updatedTypeProduct = await this.prisma.typeProduct.update({
        where: { id: typeProduct.id },
        data: {
          name: typeProduct.name,
          description: typeProduct.description,
        },
      });

      return new TypeProduct(
        updatedTypeProduct.id,
        updatedTypeProduct.name,
        updatedTypeProduct.description,
        updatedTypeProduct.createdAt,
        updatedTypeProduct.updatedAt,
      );
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao atualizar tipo de produto: ${error.message}`,
        'update',
        this.entity,
        error as Error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.typeProduct.delete({
        where: { id },
      });
    } catch (error) {
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao deletar tipo de produto: ${error.message}`,
        'delete',
        this.entity,
        error as Error,
      );
    }
  }
}
