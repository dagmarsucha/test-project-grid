import { Component, inject, signal } from '@angular/core';
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
  private readonly _dialog = inject(PfModalService);

  gridType = signal<GridType>('regular');

  openModal() {
    const modalRef = this._dialog.open(TilesSettingsModal);
    modalRef.afterClosed$.subscribe((result) => {
      if (result) {
        console.log('Modal closed with data', result);
      }
    });
  }
}
