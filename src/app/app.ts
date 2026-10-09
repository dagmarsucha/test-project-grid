import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { HeaderBar } from './layout/header-bar/header-bar';
import { SettingsStore } from './shared/settings-store';

@Component({
  selector: 'app-root',
  imports: [HeaderBar, Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('test-project-grid');

  private readonly _settingsStore = inject(SettingsStore);

  constructor() {
    // The endpoint needs the user's login, which only the browser has, so don't load on the server
    afterNextRender(() => this._settingsStore.loadSettings());
  }
}
