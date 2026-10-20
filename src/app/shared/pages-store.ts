import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Observable, tap } from 'rxjs';
import { IPage } from './commonTypes';

const LIST_PAGES_URL = '/point/api/v1/page-admin/list-pages';
const AJAX_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };

interface PagesState {
  pages: IPage[];
}

const initialState: PagesState = {
  pages: [],
};

export const PagesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    loadPages(): Observable<IPage[]> {
      return http
        .get<IPage[]>(LIST_PAGES_URL, {
          params: { langId: 2, brandBook: 'bm' },
          headers: AJAX_HEADERS,
        })
        .pipe(tap((pages) => patchState(store, { pages })));
    },
  })),
);
