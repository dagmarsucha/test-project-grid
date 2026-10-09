import { Component, model, signal } from '@angular/core';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfSelectModule } from '@papirfly-ui/angular/select';
import { papirflyIcons21Tiles, papirflyIcons3Tiles } from '@papirfly-ui/icons';
import { GridType } from '../../shared/commonTypes';

@Component({
  selector: 'selector',
  imports: [PfSelectModule, PfIconModule],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector {
  gridType = model.required<GridType>();
  protected readonly hasSelected = signal(false);

  constructor(private _iconsRegistryService: IconsRegistryService) {
    this._iconsRegistryService.registerIcons([papirflyIcons21Tiles, papirflyIcons3Tiles]);
  }
}
