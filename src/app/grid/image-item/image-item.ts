import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GridType } from '../../shared/commonTypes';
import { getAspectRatioClass } from '../../shared/utils';

@Component({
  selector: 'image-item',
  imports: [RouterLink],
  templateUrl: './image-item.html',
  styleUrl: './image-item.scss',
})
export class ImageItem {
  id = input.required<number>();
  imageUrl = input('');
  title = input('');
  gridType = input<GridType>('regular');
  index = input(0);

  protected readonly aspectRatioClasses = computed(() =>
    getAspectRatioClass(this.gridType(), this.index()),
  );
}
