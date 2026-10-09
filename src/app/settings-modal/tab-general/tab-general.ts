import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PfxBackgroundPickerModule } from '@papirfly-ui/angular-extensions/background-picker';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfSelectModule } from '@papirfly-ui/angular/select';
import {
  papirflyIcons11Tiles,
  papirflyIcons12Tiles,
  papirflyIcons3Tiles,
  papirflyIcons4Tiles,
  papirflyIconsSave,
  papirflyIconsTilesMultiline2,
  papirflyIconsTilesMultiline8,
  papirflyIconsWidthFull,
} from '@papirfly-ui/icons';
import { DisplayType, IAsset, IBackground, StylesType } from '../../shared/commonTypes';
import { SettingsStore } from '../../shared/settings-store';
import { GeneralForm, patchBackground, patchBackgroundAsset } from '../settings-form';

@Component({
  selector: 'tab-general',
  imports: [
    PfxTranslateDynamicPipe,
    PfIconModule,
    PfSelectModule,
    ReactiveFormsModule,
    PfxBackgroundPickerModule,
  ],
  templateUrl: './tab-general.html',
  styleUrl: './tab-general.scss',
})
export class TabGeneral {
  protected readonly store = inject(SettingsStore);

  form = input.required<GeneralForm>();

  protected readonly styleOptions: StylesType[] = [
    { title: 'GENERAL:ONE_AND_ONE', set: 'point/general', icon: '1-1-tiles', value: '4-8' },
    { title: 'TILES:ONE_AND_TWO', set: 'point/tiles', icon: '1-2-tiles', value: '3-3-6' },
    { title: 'GENERAL:THIRDS', set: 'point/general', icon: '3-tiles', value: '4-4-4' },
    { title: 'GENERAL:QUARTERS', set: 'point/general', icon: '4-tiles', value: '3-3-3-3' },
    {
      title: 'GENERAL:MULTILINE-8',
      set: 'point/general',
      icon: 'tiles-multiline-8',
      value: '6-3-3',
    },
    {
      title: 'component.basic_tiles.style_multi_2',
      set: 'point/tiles',
      icon: 'tiles-multiline-2',
      value: 'multi-2',
    },
  ];

  protected readonly displayOptions: DisplayType[] = [
    { title: 'CORE:NORMAL', icon: 'squares', value: 'normal' },
    { title: 'CORE:FULLWIDTH', icon: 'width-full', value: 'fullwidth' },
  ];

  protected updateBackground(changes: Partial<IBackground>): void {
    patchBackground(this.form().controls.background, changes);
  }

  protected updateAsset(asset: Omit<IAsset, 'id' | 'isVideo'> | null): void {
    patchBackgroundAsset(this.form().controls.background, asset);
  }

  constructor(private _iconsRegistryService: IconsRegistryService) {
    this._iconsRegistryService.registerIcons([
      papirflyIcons11Tiles,
      papirflyIcons12Tiles,
      papirflyIcons3Tiles,
      papirflyIcons4Tiles,
      papirflyIconsTilesMultiline8,
      papirflyIconsTilesMultiline2,
      papirflyIconsSave,
      papirflyIconsWidthFull,
    ]);
  }
}
