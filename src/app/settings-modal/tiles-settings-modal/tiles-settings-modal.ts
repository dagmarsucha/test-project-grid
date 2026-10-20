import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
import { combineLatest } from 'rxjs';
import { PagesStore } from '../../shared/pages-store';
import { SettingsStore } from '../../shared/settings-store';
import { ItemsList } from '../items-list/items-list';
import { createSettingsForm, fillSettingsForm, toSettings } from '../settings-form';
import { TabGeneral } from '../tab-general/tab-general';

export type SettingsTabsType = 'general' | 'animations';

@Component({
  selector: 'app-tiles-settings-modal',
  imports: [PfxTranslateDynamicPipe, PfIconModule, TabGeneral, ReactiveFormsModule, ItemsList],
  templateUrl: './tiles-settings-modal.html',
  styleUrl: './tiles-settings-modal.scss',
})
export class TilesSettingsModal {
  private readonly _settingsStore = inject(SettingsStore);
  private readonly _pagesStore = inject(PagesStore);
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _modalRef = inject(PfModalRef);
  private readonly _translateService = inject(PfxTranslateService);
  private readonly _iconsRegistryService = inject(IconsRegistryService);

  protected readonly form = createSettingsForm(this._fb);

  protected readonly currentTab = signal<SettingsTabsType>('general');

  // 'loading' shows the overlay. Saving is only allowed once 'loaded': before that the
  // form is empty, and saving it would wipe the items. 'error' hides the overlay so the
  // modal can still be closed
  protected readonly loadState = signal<'loading' | 'loaded' | 'error'>('loading');

  constructor() {
    this._iconsRegistryService.registerIcons([
      papirflyIconsSquares,
      papirflyIcons21Tiles,
      papirflyIconsSave,
      papirflyIconsCross,
    ]);

    // Load fresh settings every time the modal opens. takeUntilDestroyed cancels the
    // request if the modal is closed before the response arrives

    combineLatest({
      settings: this._settingsStore.loadSettings(),
      pages: this._pagesStore.loadPages(),
    })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: ({ settings, pages }) => {
          fillSettingsForm(this.form, this._fb, settings);
          this.loadState.set('loaded');
          console.log('Pages data: ', pages);
        },
        error: (err) => {
          console.error('Loading settings failed:', err);
          this.loadState.set('error');
        },
      });
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
    // The button is disabled too, but Enter in an input also submits the form
    if (this.loadState() !== 'loaded') {
      return;
    }
    const changes = toSettings(this.form);
    this._settingsStore.saveSettings(changes).subscribe({
      // The next open loads fresh settings, so new items get their server ids then
      next: () => this._modalRef.close(true),
      // Keep the modal open so the user's edits aren't lost
      error: (err) => console.error('Saving settings failed:', err),
    });
  }

  protected onTabClick(tab: SettingsTabsType): void {
    this.currentTab.set(tab);
  }
}
