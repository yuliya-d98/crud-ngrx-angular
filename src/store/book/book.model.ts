import {IBook} from "../../interfaces/book.interface";

// This file will hold the interface of books store.

export interface IBookState {
  books: IBook[];
  isLoading: boolean;
}
