import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Footer } from './layout/footer/footer';
import { HeaderBar } from './layout/header-bar/header-bar';
import { PagesStore } from './shared/pages-store';
import { SettingsStore } from './shared/settings-store';

@Component({
  selector: 'app-root',
  imports: [HeaderBar, Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('test-project-grid');

  private readonly _pagesStore = inject(PagesStore);
  private readonly _settingsStore = inject(SettingsStore);

  protected readonly loadState = signal<'loading' | 'loaded' | 'error'>('loading');

  constructor() {
    afterNextRender(() => {
      forkJoin([this._pagesStore.loadPages(), this._settingsStore.loadSettings()]).subscribe({
        next: (data) => {
          this.loadState.set('loaded');
        },
        error: (err) => {
          this.loadState.set('error');
        },
      });
    });
  }
}
