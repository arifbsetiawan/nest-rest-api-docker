import { Auhtor } from "./author.interface";

export interface Book {
  id?: string;
  title: string;
  year: number;
  author: Auhtor;
}