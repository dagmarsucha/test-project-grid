import { Component, input } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { PfxBackgroundPickerModule } from '@papirfly-ui/angular-extensions/background-picker';
import { PfxFocusPickerModule } from '@papirfly-ui/angular-extensions/focus-picker';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IAsset, IBackground } from '../../shared/commonTypes';
import { ItemForm, patchBackground, patchBackgroundAsset } from '../settings-form';

@Component({
  selector: 'items-list',
  imports: [
    PfxTranslateDynamicPipe,
    ReactiveFormsModule,
    PfxBackgroundPickerModule,
    PfxFocusPickerModule,
  ],
  templateUrl: './items-list.html',
  styleUrl: './items-list.scss',
})
export class ItemsList {
  items = input.required<FormArray<ItemForm>>();

  protected updateBackground(row: ItemForm, changes: Partial<IBackground>): void {
    patchBackground(row.controls.background, changes);
  }

  protected updateAsset(row: ItemForm, asset: Omit<IAsset, 'id' | 'isVideo'> | null): void {
    patchBackgroundAsset(row.controls.background, asset);
  }
}
