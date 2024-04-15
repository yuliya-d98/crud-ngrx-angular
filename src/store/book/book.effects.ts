import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromBooks from './index';
import { BookService } from '../../services/book.service';
import { IBook } from '../../interfaces/book.interface';

// Here we will manage all side effects from action dispatching.
// In our case we will be calling the books service to manipulate the data.

@Injectable()
export class BooksEffects {
  constructor(private readonly actions$: Actions, private readonly bookService: BookService) {
  }

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBooks.getBooks.type),
      switchMap(() => this.bookService.getBooks()),
      map((books: IBook[]) => fromBooks.getBooksSuccess({books}))
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBooks.createBook),
      switchMap(({book}) => this.bookService.create(book as IBook)),
      map((book: IBook) => fromBooks.createBookSuccess({book}))
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBooks.updateBook),
      switchMap(({book}) => this.bookService.update(book)),
      map((book: IBook) => fromBooks.updateBookSuccess({book}))
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBooks.deleteBook),
      switchMap(({book}) => this.bookService.delete(book)),
      map((book: IBook) => fromBooks.deleteBookSuccess({book}))
    )
  );
}
