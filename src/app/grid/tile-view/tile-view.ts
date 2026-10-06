import { Component, computed, input } from '@angular/core';
import { IGridType } from '../../shared/commonTypes';
import imageData from '../../shared/imageData.json';
import { isWideTile } from '../../shared/utils';
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

  protected readonly colMdClasses = computed(() =>
    this.imageData.map((_, index) => {
      if (this.gridType() === 'regular') {
        return 'l-grid__col--4@md';
      }
      return isWideTile(index) ? 'l-grid__col--6@md' : 'l-grid__col--3@md';
    }),
  );
}
