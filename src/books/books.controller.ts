import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from 'src/interfaces/book.interface';
import { BookDto } from '../dto/book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
	constructor(private readonly bookService: BooksService) {}

	@Get()
	async index(): Promise<Book[]> 
	{
		return await this.bookService.findAll();
	}

	@Get(':id')
	async detail(@Param('id') id: string): Promise<Book> 
	{
		return await this.bookService.findOne(id);
	}

	@Post()
	async create(@Body() Book: BookDto): Promise<Book> 
	{
		return await this.bookService.create(Book);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() Book: BookDto): Promise<Book>
	{
		return await this.bookService.update(id, Book);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<Book>
	{
		return await this.bookService.delete(id);
	}
}
