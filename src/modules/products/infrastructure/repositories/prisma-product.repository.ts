import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { RepositoryError } from 'src/shared/domain/errors/repository.error';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { error } from 'console';
import { Product } from 'src/shared/domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  private readonly entity = 'Product';
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const createdProduct = await this.prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          typeId: product.typeProductId,
          createdAt: product.createAt,
          updatedAt: product.updateAt,
        },
      });

      return new Product(
        createdProduct.id,
        createdProduct.name,
        createdProduct.description,
        createdProduct.price,
        createdProduct.stock,
        createdProduct.typeId,
        createdProduct.createdAt,
        createdProduct.updatedAt,
      );
    } catch (error) {
      console.error('Error creating product:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao  ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new RepositoryError(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Falha ao buscar produto por nome`,
          'create',
          this.entity,
          error as unknown as Error,
        );
      }

      return new Product(
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.typeId,
        product.createdAt,
        product.updatedAt,
      );
    } catch (error) {
      console.error('Error finding product by id:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar produto por ID: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async findByName(name: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findFirst({
        where: { name },
      });

      if (!product) {
        throw new RepositoryError(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Falha ao buscar produto por nome`,
          'create',
          this.entity,
          error as unknown as Error,
        );
      }

      return new Product(
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.typeId,
        product.createdAt,
        product.updatedAt,
      );
    } catch (error) {
      console.error('Error finding product by name:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar produto por nome: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany();

      return products.map(
        (product) =>
          new Product(
            product.id,
            product.name,
            product.description,
            product.price,
            product.stock,
            product.typeId,
            product.createdAt,
            product.updatedAt,
          ),
      );
    } catch (error) {
      console.error('Error finding all products:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao buscar todos os produtos: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const updatedProduct = await this.prisma.product.update({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          typeId: product.typeProductId,
          updatedAt: product.updateAt,
        },
        where: { id: product.id },
      });

      return new Product(
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.price,
        updatedProduct.stock,
        updatedProduct.typeId,
        updatedProduct.createdAt,
        updatedProduct.updatedAt,
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao atualizar produto: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new RepositoryError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Falha ao deletar produto: ${error.message}`,
        'create',
        this.entity,
        error as Error,
      );
    }
  }
}
