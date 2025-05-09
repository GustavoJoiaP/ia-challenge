import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infrastructure/prisma/prisma.service';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { Product } from 'src/shared/domain/entities/product.entity';
import { TypeProduct } from 'src/shared/domain/entities/typeProduct.entity';
import { UUID } from 'crypto';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: {
        id: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        typeProductId: product.TypeProduct.typeProductId,
      },
      include: {
        typeProduct: true,
      },
    });

    return new Product(
      createdProduct.id,
      new TypeProduct(
        createdProduct.typeProduct.id,
        createdProduct.typeProduct.name,
        createdProduct.typeProduct.description,
        createdProduct.typeProduct.createdAt,
        createdProduct.typeProduct.updatedAt,
      ),
      createdProduct.name,
      createdProduct.description,
      createdProduct.price,
      createdProduct.stock,
      createdProduct.createdAt,
      createdProduct.updatedAt,
    );
  }

  async findById(id: UUID): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        typeProduct: true,
      },
    });

    if (!product) return null;

    return new Product(
      product.id,
      new TypeProduct(
        product.typeProduct.id,
        product.typeProduct.name,
        product.typeProduct.description,
        product.typeProduct.createdAt,
        product.typeProduct.updatedAt,
      ),
      product.name,
      product.description,
      product.price,
      product.stock,
      product.createdAt,
      product.updatedAt,
    );
  }

  async findByName(name: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { name: { contains: name } },
      include: {
        typeProduct: true,
      },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          new TypeProduct(
            product.typeProduct.id,
            product.typeProduct.name,
            product.typeProduct.description,
            product.typeProduct.createdAt,
            product.typeProduct.updatedAt,
          ),
          product.name,
          product.description,
          product.price,
          product.stock,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async findByType(typeProduct: TypeProduct): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { typeProductId: typeProduct.typeProductId },
      include: {
        typeProduct: true,
      },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          new TypeProduct(
            product.typeProduct.id,
            product.typeProduct.name,
            product.typeProduct.description,
            product.typeProduct.createdAt,
            product.typeProduct.updatedAt,
          ),
          product.name,
          product.description,
          product.price,
          product.stock,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        typeProduct: true,
      },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          new TypeProduct(
            product.typeProduct.id,
            product.typeProduct.name,
            product.typeProduct.description,
            product.typeProduct.createdAt,
            product.typeProduct.updatedAt,
          ),
          product.name,
          product.description,
          product.price,
          product.stock,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: { id: product.productId },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        typeProductId: product.TypeProduct.typeProductId,
      },
      include: {
        typeProduct: true,
      },
    });

    return new Product(
      updatedProduct.id,
      new TypeProduct(
        updatedProduct.typeProduct.id,
        updatedProduct.typeProduct.name,
        updatedProduct.typeProduct.description,
        updatedProduct.typeProduct.createdAt,
        updatedProduct.typeProduct.updatedAt,
      ),
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.stock,
      updatedProduct.createdAt,
      updatedProduct.updatedAt,
    );
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
} 