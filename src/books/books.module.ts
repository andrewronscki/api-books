import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksEntity } from './interfaces/books.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([BooksEntity])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
