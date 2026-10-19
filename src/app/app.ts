import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { HeaderBar } from './layout/header-bar/header-bar';

@Component({
  selector: 'app-root',
  imports: [HeaderBar, Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('test-project-grid');
}
