import { Component, computed, input } from '@angular/core';
import { IGridType } from '../../commonTypes';
import imageData from '../../data/imageData.json';
import { ImageItem } from '../image-item/image-item';

@Component({
  selector: 'tile-view',
  imports: [ImageItem],
  templateUrl: './tile-view.html',
  styleUrl: './tile-view.scss',
})
export class TileView {
  protected readonly imageData = imageData;
  gridType = input<IGridType>('regular');

  // Random pattern repeats every 6 tiles: tiles 3 and 4 are wide, the rest narrow
  protected readonly colMdClasses = computed(() =>
    this.imageData.map((_, index) => {
      if (this.gridType() === 'regular') {
        return 'l-grid__col--4@md';
      }
      const position = index % 6;
      return position === 2 || position === 3 ? 'l-grid__col--6@md' : 'l-grid__col--3@md';
    }),
  );
}
