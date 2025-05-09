import { v4 as uuidv4 } from 'uuid';
import { TypeProduct } from 'src/shared/domain/entities/type-product.entity';
import { ITypeProductFactory } from 'src/shared/domain/factories/type-product-factory.interface';
import { InvalidDatasError } from 'src/modules/users/domain/erros/invalid-data.error';

export class TypeProductFactory implements ITypeProductFactory {
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

  makeNew(name: string, description: string): TypeProduct {
    try {
      this.validateName(name);
      this.validateDescription(description);

      const typeProductId = uuidv4();
      const now = new Date();
      return new TypeProduct(typeProductId, name, description, now, now);
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }

  makeExistent(
    typeProductId: string,
    name: string,
    description: string,
    createAt: Date,
  ): TypeProduct {
    try {
      this.validateName(name);
      this.validateDescription(description);

      const now = new Date();
      return new TypeProduct(typeProductId, name, description, createAt, now);
    } catch (error) {
      console.error('Erro ao executar operação:', error);
      throw error;
    }
  }
}
