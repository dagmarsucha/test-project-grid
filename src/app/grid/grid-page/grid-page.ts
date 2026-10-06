import { Component, signal } from '@angular/core';
import { IGridType } from '../../shared/commonTypes';
import { Selector } from '../selector/selector';
import { TileView } from '../tile-view/tile-view';

@Component({
  selector: 'app-grid-page',
  imports: [Selector, TileView],
  templateUrl: './grid-page.html',
  styleUrl: './grid-page.scss',
})
export class GridPage {
  gridType = signal<IGridType>('regular');
}
