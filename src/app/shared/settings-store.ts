import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { getState, patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Observable, tap } from 'rxjs';
import { IComponentResponse } from './commonTypes';

type SettingsState = IComponentResponse;

// Loading and saving use the same address; the `do` parameter picks the action
const COMPONENT_URL = '/point/en/bm/component/default/2087';
const AJAX_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };

const initialState: SettingsState = {
  display: 'normal',
  darktheme: false,
  title: '',
  subtitle: '',
  styles: '',
  loadmore: false,
  permissions: false,
  rowsVisible: 0,
  background: {
    imagePath: '',
    imageName: '',
    color: '',
    gradient: '',
    opacity: '1',
    isVideo: false,
    asset: null,
    position: 'center center',
  },
  animations: {
    appearing: { name: null },
    hover: { name: null, overlayColor: '', overlayOpacity: '0', textColor: '', iconColor: '' },
  },
  parallax: { speed: 0, direction: 'up', show: false },
  items: [],
  copyLanguages: false,
  userGroups: [],
  languages: [],
  pages: [],
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    update(changes: Partial<IComponentResponse>) {
      patchState(store, changes);
    },
    loadSettings() {
      patchState(store);
      http
        .get<IComponentResponse>(COMPONENT_URL, {
          params: { mode: 'editor', do: 'control-22815-load' },
          headers: AJAX_HEADERS,
        })
        .subscribe({
          next: (response) => {
            patchState(store, { ...response });
            console.log(response);
          },
          error: (err) => {
            console.error('Loading settings failed:', err);
            patchState(store);
          },
        });
    },
    // Sends the whole object the server loaded, with the changes applied. The server
    // expects every field back, including the ones the app never edits (animations,
    // parallax, permissions, userGroups, languages, pages). The store is updated only
    // after the server accepts the save.
    saveSettings(changes: Partial<IComponentResponse>): Observable<unknown> {
      const settings = { ...getState(store), ...changes };

      return http
        .post(COMPONENT_URL, settings, {
          params: { mode: 'editor', do: 'control-22815-save' },
          headers: AJAX_HEADERS,
        })
        .pipe(tap(() => patchState(store, changes)));
    },
  })),
);
