import { Component, model, signal } from '@angular/core';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfSelectModule } from '@papirfly-ui/angular/select';
import { completeIconSet } from '@papirfly-ui/icons';
import { IGridType } from '../../commonTypes';

@Component({
  selector: 'selector',
  imports: [PfSelectModule, PfIconModule],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector {
  gridType = model<IGridType>('regular');
  protected readonly hasSelected = signal(false);

  constructor(private _iconsRegistryService: IconsRegistryService) {
    this._iconsRegistryService.registerIcons(completeIconSet);
  }
}
