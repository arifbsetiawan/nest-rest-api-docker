import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: String,
  year: Number,
  author: {
    name: String,
    phone: String,
    address: String,
  }
});