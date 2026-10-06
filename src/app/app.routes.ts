import { Routes } from '@angular/router';
import { Content } from './content/content';
import { GridPage } from './grid/grid-page/grid-page';
import { ImageDetail } from './image-detail/image-detail';

export const routes: Routes = [
  {
    path: '',
    component: GridPage,
  },
  {
    path: 'content',
    component: Content,
  },
  {
    path: 'image-detail/:id',
    component: ImageDetail,
  },
];
