import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/shared/domain/repository/product-repository.interface';
import { Product } from 'src/shared/domain/entities/product.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    console.log('Creating product with data:', product);
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          stock: Number(product.stock),
          typeProductId: product.typeProduct,
        },
      });
      console.log('Product created successfully:', createdProduct);

      return new Product(
        createdProduct.id,
        createdProduct.typeProductId,
        createdProduct.name,
        createdProduct.description,
        createdProduct.price,
        createdProduct.stock,
        createdProduct.createdAt,
        createdProduct.updatedAt,
      );
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        typeProduct: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }
    const oneTypeProduct = await this.prisma.typeProduct.findUnique({
      where: { id: product.typeProduct.id },
    });
    if (!oneTypeProduct) {
      throw new Error('Type product not found');
    }

    return new Product(
      product.id,
      oneTypeProduct.id,
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
          product.typeProductId,
          product.name,
          product.description,
          product.price,
          product.stock,
          product.createdAt,
          product.updatedAt,
        ),
    );
  }

  async findByType(typeProduct: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { typeProductId: typeProduct },
      include: {
        typeProduct: true,
      },
    });
    const oneTypeProduct = await this.prisma.typeProduct.findUnique({
      where: { id: typeProduct },
    });
    if (!oneTypeProduct) {
      throw new Error('Type product not found');
    }

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.typeProductId,
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
          product.typeProduct.id,
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
      where: { id: product.id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        typeProductId: product.typeProduct,
      },
      include: {
        typeProduct: true,
      },
    });

    return new Product(
      updatedProduct.id,
      updatedProduct.typeProductId,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.stock,
      updatedProduct.createdAt,
      updatedProduct.updatedAt,
    );
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
