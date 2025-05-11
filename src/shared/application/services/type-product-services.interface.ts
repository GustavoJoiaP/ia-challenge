import {
  RequestInsertTypeProductDTO,
  RequestUpdateTypeProductDTO,
} from '../dto/request/request-type-product.dto';
import { ResponseTypeProductDTO } from '../dto/response/response-type-product.dto';

export interface IInsertTypeProductService {
  createTypeProduct(
    typeProduct: RequestInsertTypeProductDTO,
  ): Promise<ResponseTypeProductDTO>;
}

export interface IReadTypeProductService {
  findTypeProductById(id: string): Promise<ResponseTypeProductDTO | null>;
  findTypeProductByName(name: string): Promise<ResponseTypeProductDTO | null>;
  findAllTypeProducts(): Promise<ResponseTypeProductDTO[]>;
}

export interface IUpdateTypeProductService {
  updateTypeProduct(
    typeProduct: RequestUpdateTypeProductDTO,
  ): Promise<ResponseTypeProductDTO>;
}

export interface IDeleteTypeProductService {
  deleteTypeProduct(id: string): Promise<void>;
}
