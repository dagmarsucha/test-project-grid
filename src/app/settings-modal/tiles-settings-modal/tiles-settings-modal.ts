import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getState } from '@ngrx/signals';
import {
  PfxTranslateDynamicPipe,
  PfxTranslateService,
} from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfModalRef } from '@papirfly-ui/angular/modal';
import {
  papirflyIcons21Tiles,
  papirflyIconsCross,
  papirflyIconsSave,
  papirflyIconsSquares,
} from '@papirfly-ui/icons';
import { SettingsStore } from '../../shared/settings-store';
import { ItemsList } from '../items-list/items-list';
import { createSettingsForm, fillSettingsForm } from '../settings-form';
import { TabGeneral } from '../tab-general/tab-general';

export type SettingsTabsType = 'general' | 'animations';

@Component({
  selector: 'app-tiles-settings-modal',
  imports: [PfxTranslateDynamicPipe, PfIconModule, TabGeneral, ReactiveFormsModule, ItemsList],
  templateUrl: './tiles-settings-modal.html',
  styleUrl: './tiles-settings-modal.scss',
})
export class TilesSettingsModal {
  private readonly _store = inject(SettingsStore);
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _modalRef = inject(PfModalRef);
  private readonly _translateService = inject(PfxTranslateService);
  private readonly _iconsRegistryService = inject(IconsRegistryService);

  protected readonly form = createSettingsForm(this._fb);

  protected readonly currentTab = signal<SettingsTabsType>('general');

  constructor() {
    this._iconsRegistryService.registerIcons([
      papirflyIconsSquares,
      papirflyIcons21Tiles,
      papirflyIconsSave,
      papirflyIconsCross,
    ]);

    fillSettingsForm(this.form, this._fb, getState(this._store));
  }

  protected onClose(): void {
    // Closing throws the form away, so check before losing unsaved edits
    const question = `${this._translateService.translate('CORE:DISCARD_CHANGES')}?`;
    if (this.form.dirty && !window.confirm(question)) {
      return;
    }
    this._modalRef.close(false);
  }

  protected onSave(): void {
    // const changes = toSettings(this.form, getState(this._store));
    // this._store.saveSettings(changes).subscribe({
    //   next: () => this._modalRef.close(true),
    //   // Keep the modal open so the user's edits aren't lost
    //   error: (err) => console.error('Saving settings failed:', err),
    // });
  }

  protected onTabClick(tab: SettingsTabsType): void {
    this.currentTab.set(tab);
  }
}
