import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequestInsertProductDTO } from './application/dtos/request-insert-product.dto';
import { IInsertProductService } from 'src/shared/application/services/product-services.interface';
import { IReadProductService } from 'src/shared/application/services/product-services.interface';
import { IUpdateProductService } from 'src/shared/application/services/product-services.interface';
import { IDeleteProductService } from 'src/shared/application/services/product-services.interface';
import {
  IInsertProductServiceToken,
  IReadProductServiceToken,
  IUpdateProductServiceToken,
  IDeleteProductServiceToken,
} from 'src/shared/domain/constants';
import { ResponseProductDTO } from 'src/shared/application/dto/response/response-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(IInsertProductServiceToken)
    private readonly insertProductService: IInsertProductService,

    @Inject(IReadProductServiceToken)
    private readonly readProductService: IReadProductService,

    @Inject(IUpdateProductServiceToken)
    private readonly updateProductService: IUpdateProductService,

    @Inject(IDeleteProductServiceToken)
    private readonly deleteProductService: IDeleteProductService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseProductDTO[]> {
    try {
      return await this.readProductService.findAllProducts();
    } catch (error) {
      throw new HttpException(
        'Error finding all products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<ResponseProductDTO> {
    try {
      return await this.readProductService.findProductByName(name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error finding product by name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseProductDTO> {
    try {
      return await this.readProductService.findProductById(id);
    } catch (error) {
      throw new HttpException(
        'Error finding product by id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body() product: RequestInsertProductDTO,
  ): Promise<ResponseProductDTO> {
    try {
      return await this.insertProductService.createProduct(product);
    } catch (error) {
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: RequestUpdateProductDTO,
  ): Promise<ResponseProductDTO> {
    try {
      return await this.updateProductService.updateProduct(id, product);
    } catch (error) {
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteProductService.deleteProduct(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 