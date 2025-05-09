import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';
import { Product } from 'src/shared/domain/entities/product.entity';

@Injectable()
export class ProductFactory implements IProductFactory {
  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new InvalidDatasError();
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new InvalidDatasError();
    }
  }
  makeNew(
    typeProduct: string,
    name: string,
    description: string,
    price: number,
    stock: number,
  ): Product {
    try {
      this.validateName(name);
      this.validateDescription(description);

      const productId = uuidv4();
      const now = new Date();
      return new Product(
        productId,
        name,
        description,
        price,
        stock,
        typeProduct,
        now,
        now,
      );
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }

  makeExistent(
    productId: string,
    typeProduct: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    createdAt: Date,
  ): Product {
    try {
      this.validateName(name);
      this.validateDescription(description);

      const now = new Date();
      return new Product(
        productId,
        name,
        description,
        price,
        stock,
        typeProduct,
        createdAt,
        now,
      );
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }
}
