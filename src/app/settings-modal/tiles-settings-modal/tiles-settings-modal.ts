import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getState } from '@ngrx/signals';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { PfModalConfig, PfModalRef } from '@papirfly-ui/angular/modal';
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
export class TilesSettingsModal implements OnInit {
  settings = new FormControl('');
  private readonly _store = inject(SettingsStore);
  private readonly _fb = inject(NonNullableFormBuilder);

  protected readonly form = createSettingsForm(this._fb);

  protected readonly currentTab = signal<SettingsTabsType>('general');

  constructor(
    private _iconsRegistryService: IconsRegistryService,
    private _modalRef: PfModalRef,
    private _modalConfig: PfModalConfig,
  ) {
    this._iconsRegistryService.registerIcons([
      papirflyIconsSquares,
      papirflyIcons21Tiles,
      papirflyIconsSave,
      papirflyIconsCross,
    ]);

    fillSettingsForm(this.form, this._fb, getState(this._store));
  }

  ngOnInit() {
    // console.log(this._modalConfig);
  }

  protected onClose() {
    this._modalRef.close('assetId');
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
