import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, input } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PfxBackgroundPickerModule } from '@papirfly-ui/angular-extensions/background-picker';
import { PfxFocusPickerModule } from '@papirfly-ui/angular-extensions/focus-picker';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfTooltipModule } from '@papirfly-ui/angular/tooltip';
import {
  papirflyIconsCopy,
  papirflyIconsDotsGridVertical,
  papirflyIconsPlus,
  papirflyIconsTrash,
} from '@papirfly-ui/icons';
import { IAsset, IBackground } from '../../shared/commonTypes';
import {
  createItemForm,
  ItemForm,
  newItem,
  patchBackground,
  patchBackgroundAsset,
  toItem,
} from '../settings-form';

@Component({
  selector: 'items-list',
  imports: [
    PfxTranslateDynamicPipe,
    ReactiveFormsModule,
    PfxBackgroundPickerModule,
    PfxFocusPickerModule,
    PfIconModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    PfTooltipModule,
  ],
  templateUrl: './items-list.html',
  styleUrl: './items-list.scss',
})
export class ItemsList {
  private readonly _fb = inject(NonNullableFormBuilder);

  items = input.required<FormArray<ItemForm>>();

  constructor() {
    inject(IconsRegistryService).registerIcons([
      papirflyIconsPlus,
      papirflyIconsDotsGridVertical,
      papirflyIconsCopy,
      papirflyIconsTrash,
    ]);
  }

  // moveItemInArray would only reorder `controls` behind the FormArray's back,
  // so move the row with removeAt/insert to keep the form value in step
  protected drop(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }
    const array = this.items();
    const row = array.at(event.previousIndex);
    array.removeAt(event.previousIndex, { emitEvent: false });
    array.insert(event.currentIndex, row);
    array.markAsDirty();
  }

  protected addItem(): void {
    this.items().push(createItemForm(this._fb, newItem()));
    // Lets the modal warn about unsaved changes on close
    this.items().markAsDirty();
  }

  protected deleteItem(index: number): void {
    this.items().removeAt(index);
    this.items().markAsDirty();
  }

  protected duplicateItem(index: number): void {
    const copy = { ...toItem(this.items().at(index)), id: 0 };
    this.items().insert(index + 1, createItemForm(this._fb, copy));
    this.items().markAsDirty();
  }

  protected updateBackground(row: ItemForm, changes: Partial<IBackground>): void {
    patchBackground(row.controls.background, changes);
  }

  protected updateAsset(row: ItemForm, asset: Omit<IAsset, 'id' | 'isVideo'> | null): void {
    patchBackgroundAsset(row.controls.background, asset);
  }
}
