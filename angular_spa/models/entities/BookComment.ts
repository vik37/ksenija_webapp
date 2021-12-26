import { Book } from './Book';
import { User } from 'src/app/user/user/models/user';
export interface BookComment{
  id:number,
  bookComment: string,
  book: Book,
  user: User
}
