import { Component, computed, input } from '@angular/core';
import { IGridType } from '../../commonTypes';

@Component({
  selector: 'image-item',
  imports: [],
  templateUrl: './image-item.html',
  styleUrl: './image-item.scss',
})
export class ImageItem {
  imageUrl = input('');
  title = input('');
  gridType = input<IGridType>('regular');
  index = input(0);

  protected readonly aspectRatioClasses = computed(() => {
    if (this.gridType() === 'regular') {
      return 'o-ratio--4-3';
    } else {
      const position = this.index() % 6;
      return position === 2 || position === 3 ? 'ratio-wide' : 'o-ratio--1-1';
    }
  });
}
