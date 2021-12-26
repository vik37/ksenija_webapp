import { Book } from './Book';

export interface Hyperlink{
  id: number,
  name: string,
  link: string,
  bookId?: number,
  book: Book
}
