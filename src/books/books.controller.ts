import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BooksDto } from './dtos/books.dto';
import { BooksEntity } from './interfaces/books.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiTags('books')
  @ApiQuery({ name: 'search', required: false, type: String})
  @ApiQuery({ name: 'page', required: false, type: Number})
  @ApiQuery({ name: 'limit', required: false, type: Number})
  @ApiQuery({ name: 'startingYear', required: false, type: String})
  @ApiQuery({ name: 'finalYear', required: false, type: String})
  async index(
  @Query('search') search: string, 
  @Query('page') page = 1,
  @Query('limit') limit = 10, 
  @Query('startingYear') startingYear: number, 
  @Query('finalYear') finalYear: number): Promise<Pagination<BooksEntity>> {
    limit = limit > 100 ? 100 : limit;
    
    return this.booksService.findAll({
      page,
      limit,
    }, search, startingYear, finalYear);
  }

  @Get(':id')
  @ApiTags('books')
  async indexOne(@Param('id') id: string): Promise<BooksEntity> {
    return await this.booksService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiTags('books')
  @ApiBody({ type: BooksDto})
  async create(@Body() book: BooksDto): Promise<BooksEntity> { 
    return await this.booksService.create(book)
  }

  @Put(':id')
  @ApiTags('books')
  async update(@Param('id') id: string, @Body() book: BooksDto): Promise<BooksEntity> { 
    return await this.booksService.update(id, book);
  }

  @Delete(':id')
  @ApiTags('books')
  async remove(@Param('id') id: string): Promise<void> { 
    return this.booksService.remove(id);
  }

}
