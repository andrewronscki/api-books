import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BooksModule, DatabaseModule],
})
export class AppModule {}
