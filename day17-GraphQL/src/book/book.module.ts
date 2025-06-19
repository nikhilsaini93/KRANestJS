import { Module } from '@nestjs/common';

import { BookService } from './book.service';
import { BookeResolver } from './schema/book.resolver';


@Module({
  imports :[],
  providers: [BookService , BookeResolver]
})
export class BookModule {}
