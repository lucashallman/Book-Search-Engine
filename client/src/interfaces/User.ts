import type { Book } from './Book';

export interface User {
  _id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: Book[];
}
