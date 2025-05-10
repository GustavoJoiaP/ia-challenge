import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/shared/domain/entities/product.entity';
import { IProductFactory } from 'src/shared/domain/factories/product-factory.interface';
import { InvalidDatasError } from 'src/shared/domain/erros/invalid-data.error';

export class ProductFactory implements IProductFactory {
  private validatePrice(price: number): void {
    if (price <= 0) {
      throw new InvalidDatasError();
    }
  }

  private validateStock(stock: number): void {
    if (stock < 0) {
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
      this.validatePrice(price);
      this.validateStock(stock);

      const productId = uuidv4();
      const now = new Date();
      const product = new Product(
        productId as `${string}-${string}-${string}-${string}-${string}`,
        typeProduct,
        name,
        description,
        price,
        stock,
        now,
        now,
      );
      console.log(product);
      return product;
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
      this.validatePrice(price);
      this.validateStock(stock);
      const now = new Date();
      return new Product(
        productId as `${string}-${string}-${string}-${string}-${string}`,
        typeProduct,
        name,
        description,
        price,
        stock,
        createdAt,
        now,
      );
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }
}