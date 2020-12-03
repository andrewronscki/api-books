import { ApiProperty } from "@nestjs/swagger";

export class BooksDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  language: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  length: number;

  @ApiProperty()
  width:number

  @ApiProperty()
  height: number

}