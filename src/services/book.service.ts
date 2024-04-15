import { Injectable } from '@angular/core';
import {IBook} from "../interfaces/book.interface";
import {Observable, of} from "rxjs";

// The api communication with an API. In my example I will mock everything
// in the service and return an observable from there but feel free to replace
// the functions with an http call. There will be 4 functions in the service
// to fetch, create, update and delete books.

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksList: IBook[] = [
    {
      id: Math.random(),
      name: 'Book 1'
    },
    {
      id: Math.random(),
      name: 'Book 2'
    }
  ]

  constructor() {
  }

  getBooks(): Observable<IBook[]> {
    return of(this.booksList);
  }

  create(book: IBook): Observable<IBook> {
    this.booksList = [
      ...this.booksList,
      book
    ];

    return of(book);
  }
  update(updateBook: IBook): Observable<IBook> {
    this.booksList.map(book => book.id === updateBook.id ? updateBook : book);

    return  of(updateBook);
  }

  delete(book: IBook): Observable<IBook> {
    this.booksList = this.booksList.filter(b => b.id !== book.id);
    return of(book);
  }
}
