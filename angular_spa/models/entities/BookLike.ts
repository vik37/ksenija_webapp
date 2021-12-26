import { User } from "src/app/user/user/models/user";
import { Book } from "./Book";

export interface BookLike{
  id:number,
  like:boolean,
  user:User,
  book:Book
}
