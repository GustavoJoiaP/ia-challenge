import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { InsertProductService } from './application/services/insert-product.service';
import { ReadProductService } from './application/services/read-product.service';
import { UpdateProductService } from './application/services/update-product.service';
import { DeleteProductService } from './application/services/delete-product.service';
import { RequestInsertProductDTO } from 'src/shared/application/dto/request/request-product.dto';
import { RequestUpdateProductDTO } from 'src/shared/application/dto/request/request-product.dto';
import * as constants from 'src/shared/domain/constants';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(constants.IInsertProductServiceToken)
    private readonly insertProductService: InsertProductService,

    @Inject(constants.IReadProductServiceToken)
    private readonly readProductService: ReadProductService,

    @Inject(constants.IUpdateProductServiceToken)
    private readonly updateProductService: UpdateProductService,

    @Inject(constants.IDeleteProductServiceToken)
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  async createProduct(@Body() product: RequestInsertProductDTO) {
    return await this.insertProductService.createProduct(product);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.readProductService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return await this.readProductService.findByName(name);
  }

  @Get('type/:typeId')
  async findByType(@Param('typeId') typeId: string) {
    return await this.readProductService.findByType(typeId);
  }

  @Get()
  async findAll() {
    return await this.readProductService.findAll();
  }

  @Put(':id')
  async updateProduct(@Body() product: RequestUpdateProductDTO) {
    return await this.updateProductService.updateProduct(product);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: `${string}-${string}-${string}-${string}-${string}`,
  ) {
    return await this.deleteProductService.deleteProduct(id);
  }
}
