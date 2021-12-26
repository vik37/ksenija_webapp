import { Genre } from '../enums/Genre';
import { Market } from '../enums/Market';
import { Hyperlink } from './Hyperlinks';
import { BookComment } from './BookComment';
import { BookLike } from './BookLike';
export interface Book{
  id: number,
  name: string,
  description: string,
  dateOfPublish: number,
  publisher: string,
  genre1: Genre,
  genre2: Genre,
  genre3: Genre,
  genre4: Genre,
  pages: number,
  market: Market,
  country: string,
  imageName:string,
  links: Array<Hyperlink>,
  bookComments: Array<BookComment>,
  bookLikes: Array<BookLike>
}
