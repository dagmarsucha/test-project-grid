import { Component, signal } from '@angular/core';
import { GridPage } from './components/grid-page/grid-page';

@Component({
  selector: 'app-root',
  imports: [GridPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('test-project-grid');
}
