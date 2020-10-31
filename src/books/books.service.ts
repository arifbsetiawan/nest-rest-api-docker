import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from 'src/dto/book.dto';
import { Book } from 'src/interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel:Model<Book>) {}

  async findAll(): Promise<Book[]>
  {
    return await this.bookModel.find();
  }

  async findOne(id: string): Promise<Book>
  {
    return await this.bookModel.findById(id);
  }

  async create(book: BookDto): Promise<Book>
  {
    const data: Book = {
      title: book.title,
      year: book.year,
      author: {
        name: book.author,
        phone: book.phone,
        address: book.address,
      }
    };
    const newBook = new this.bookModel(data);
    return await newBook.save();
  }

  async update(id: string, book: BookDto): Promise<Book>
  {
    const data: Book = {
      title: book.title,
      year: book.year,
      author: {
        name: book.author,
        phone: book.phone,
        address: book.address,
      }
    };
    return await this.bookModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Book>
  {
    return await this.bookModel.findByIdAndRemove(id);
  }
}
