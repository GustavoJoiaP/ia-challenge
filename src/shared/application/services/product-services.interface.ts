import { Product } from '../../domain/entities/product.entity';
import { RequestInsertProductDTO } from '../dto/request/request-product.dto';
import { ResponseProductDTO } from '../dto/response/response-product.dto';

export interface IInsertProductService {
  createProduct(product: RequestInsertProductDTO): Promise<ResponseProductDTO>;
}

export interface IReadProductService {
  findProductById(id: string): Promise<ResponseProductDTO | null>;
  findProductByName(name: string): Promise<ResponseProductDTO | null>;
  findAllProducts(): Promise<ResponseProductDTO[]>;
}

export interface IUpdateProductService {
  updateProduct(product: Product): Promise<ResponseProductDTO>;
}

export interface IDeleteProductService {
  deleteProduct(id: string): Promise<void>;
}
