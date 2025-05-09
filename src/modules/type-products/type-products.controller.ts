import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestInsertTypeProductDTO } from 'src/shared/application/dto/request/request-type-product.dto';
import {
  IDeleteTypeProductService,
  IInsertTypeProductService,
  IReadTypeProductService,
  IUpdateTypeProductService,
} from 'src/shared/application/services/type-product-services.interface';
import {
  IDeleteTypeProductServiceToken,
  IInsertTypeProductServiceToken,
  IReadTypeProductServiceToken,
  IUpdateTypeProductServiceToken,
} from 'src/shared/domain/constants';
import { TypeProduct } from 'src/shared/domain/entities/type-product.entity';
import { ResponseTypeProductDTO } from 'src/shared/application/dto/response/response-type-product.dto';
import { InvalidDatasError } from '../users/domain/erros/invalid-data.error';

@Controller('type-products')
export class TypeProductsController {
  constructor(
    @Inject(IInsertTypeProductServiceToken)
    private readonly insertTypeProductService: IInsertTypeProductService,

    @Inject(IUpdateTypeProductServiceToken)
    private readonly updateTypeProductService: IUpdateTypeProductService,

    @Inject(IDeleteTypeProductServiceToken)
    private readonly deleteTypeProductService: IDeleteTypeProductService,

    @Inject(IReadTypeProductServiceToken)
    private readonly readTypeProductService: IReadTypeProductService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseTypeProductDTO[]> {
    try {
      return await this.readTypeProductService.findAllTypeProducts();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error to find all type products.',
      );
    }
  }

  @Get('name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<ResponseTypeProductDTO | null> {
    try {
      return await this.readTypeProductService.findTypeProductByName(name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error to find type product by name.',
      );
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<ResponseTypeProductDTO | null> {
    try {
      return await this.readTypeProductService.findTypeProductById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to find type product.');
    }
  }

  @Post('insert')
  async create(
    @Body() dto: RequestInsertTypeProductDTO,
  ): Promise<ResponseTypeProductDTO> {
    try {
      return await this.insertTypeProductService.createTypeProduct(dto);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new HttpException(error.message, HttpStatus.CONTENT_DIFFERENT);
      }
      throw new InternalServerErrorException('Error to create type product.');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() typeProduct: TypeProduct,
  ): Promise<ResponseTypeProductDTO> {
    try {
      return await this.updateTypeProductService.updateTypeProduct(typeProduct);
    } catch (error) {
      if (error instanceof InvalidDatasError) {
        throw new HttpException(error.message, HttpStatus.CONTENT_DIFFERENT);
      }
      throw new InternalServerErrorException('Error to update type product.');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteTypeProductService.deleteTypeProduct(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error to delete type product.');
    }
  }
}
