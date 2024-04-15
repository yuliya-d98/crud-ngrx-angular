import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {BookStoreModule} from "../store/book/book-store.module";
import * as fromBooks from '../store/book/index';
import {IBook} from "../interfaces/book.interface";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    BookStoreModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  books$: Observable<IBook[]>;
  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onCreateBook(name: string): void {
    this.store.dispatch(fromBooks.createBook({
      book: {
        id: Math.random(),
        name
      }
    }));
  }

  onUpdateBook(book: IBook): void {
    this.store.dispatch(fromBooks.updateBook({book}));
  }

  onDeleteBook(book: IBook): void {
    this.store.dispatch(fromBooks.deleteBook({book}));
  }

  private initDispatch(): void {
    this.store.dispatch(fromBooks.getBooks());
  }

  private initSubscriptions(): void {
    this.books$ = this.store.pipe(select(fromBooks.selectBooksList));
    this.isLoading$ = this.store.pipe(select(fromBooks.selectBookIsLoading));
  }
}
