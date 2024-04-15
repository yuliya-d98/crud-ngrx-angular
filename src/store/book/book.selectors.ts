import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBookState } from './book.model';

// Selectors fetch data from the store
// and return it as an observable.

export const selectBookState = createFeatureSelector<IBookState>('book');
export const selectBooksList = createSelector(selectBookState, (state) => state.books);
export const selectBookIsLoading = createSelector(selectBookState, (state) => state.isLoading);
