import { Component, signal } from '@angular/core';
import { PfModalModule, PfModalService } from '@papirfly-ui/angular/modal';
import { GridType } from '../../shared/commonTypes';
import { Selector } from '../selector/selector';
import { TileView } from '../tile-view/tile-view';
import { TilesSettingsModal } from '../../settings-modal/tiles-settings-modal/tiles-settings-modal';

@Component({
  selector: 'app-grid-page',
  imports: [Selector, TileView, PfModalModule],
  templateUrl: './grid-page.html',
  styleUrl: './grid-page.scss',
})
export class GridPage {
  gridType = signal<GridType>('regular');

  constructor(public dialog: PfModalService) {}
  openModal() {
    const modalRef = this.dialog.open(TilesSettingsModal, {
      data: { title: 'Test modal' },
    });
    modalRef.afterClosed$.subscribe((result) => {
      if (result) {
        console.log('Modal closed with data', result);
      }
    });
  }
}
