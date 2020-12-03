import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksDto } from './dtos/books.dto';
import { BooksEntity } from './interfaces/books.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(BooksEntity) private booksRepository: Repository<BooksEntity>) {}

  async findAll(options: IPaginationOptions, search?: string, startingYear?: number, finalYear?: number): Promise<Pagination<BooksEntity>> {
    const queryBuilder = this.booksRepository.createQueryBuilder('b');

    queryBuilder.select(['b.id', 'b.title', 'b.author', 'b.isbn', 'b.publisher', 'b.year']);

    if(search) {
      queryBuilder.where('title=:search', { search }).orWhere('author=:search', { search }).orWhere('isbn=:search', { search });
    }

    if(this.checkYear(startingYear, finalYear)) {
      queryBuilder.where('year>=:startingYear', { startingYear }).andWhere('year<=:finalYear', { finalYear });
    };

    queryBuilder.orderBy('b.title', 'ASC');

    return paginate<BooksEntity>(queryBuilder, options);
  }

  async findOne(id: string): Promise<BooksEntity> {
    return await this.booksRepository.findOne(id);
  }

  async create(book: BooksDto): Promise<BooksEntity> {
    return await this.booksRepository.save(book);
  }

  async update(id: string, bookData: BooksDto): Promise<BooksEntity> {
    const { title, author, isbn, language, height, length, publisher, weight, width, year } = bookData;
    const book = await this.findOne(id);

    book.title = title ? title : book.title;
    book.isbn = isbn ? isbn : book.isbn;
    book.author = author ? author : book.author;
    book.publisher = publisher ? publisher : book.publisher;
    book.year = year ? year : book.year;
    book.language = language ? language : book.language;
    book.weight = weight ? weight : book.weight;
    book.length = length ? length : book.length;
    book.width = width ? width : book.width;
    book.height = height ? height : book.height;

    return await this.booksRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete({id});
  }

  private checkYear(startingYear: number, finalYear: number): boolean {
    if(startingYear || finalYear) {
      if(!finalYear) {
        throw new BadRequestException('When you have a start year you need an end year')
      }

      if(!startingYear) {
        throw new BadRequestException('When you have a final year you need a start year')
      }

      return true;
    }
  }
}
