import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BooksEffects } from './book.effects';
import { booksReducer } from './book.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('book', booksReducer),
    EffectsModule.forFeature([BooksEffects])
  ]
})
export class BookStoreModule {}
