import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { IAsset, IBackground, IComponentSettings, ISettings } from '../shared/commonTypes';

export type ItemForm = FormGroup<{
  id: FormControl<number>;
  text: FormControl<string>;
  link: FormControl<string>;
  target: FormControl<string>;
  inverse: FormControl<boolean>;
  focus: FormControl<string>;
  background: FormControl<IBackground>;
  // The full item the row was made from, so fields the table doesn't edit survive
  // saving and duplicating
  source: FormControl<ISettings>;
}>;

export type SettingsForm = ReturnType<typeof createSettingsForm>;
export type GeneralForm = SettingsForm['controls']['general'];

const EMPTY_BACKGROUND: IBackground = {
  imagePath: '',
  imageName: '',
  color: '',
  gradient: '',
  position: '',
  opacity: '1',
  isVideo: false,
  asset: null,
};

export function createSettingsForm(fb: NonNullableFormBuilder) {
  return fb.group({
    general: fb.group({
      styles: '',
      display: '',
      rowsVisible: 0,
      title: '',
      subtitle: '',
      inverse: false,
      // The whole background object in one control; the picker edits its fields
      background: fb.control<IBackground>(EMPTY_BACKGROUND),
    }),
    items: fb.array<ItemForm>([]),
  });
}

// Only the item fields the table edits; id identifies the item when saving
export function createItemForm(fb: NonNullableFormBuilder, item: ISettings): ItemForm {
  return fb.group({
    id: item.id,
    text: item.text,
    link: item.link,
    target: item.target,
    // The API sends 0/1, the switch needs a boolean
    inverse: item.positive === 1,
    focus: item.background.position,
    // The whole background object in one control; the picker edits its fields
    background: fb.control<IBackground>(item.background),
    source: fb.control<ISettings>(item),
  });
}

// Turns a row back into the item shape the API uses
export function toItem(row: ItemForm): ISettings {
  const { source, inverse, focus, background, ...edited } = row.getRawValue();
  return {
    ...source,
    ...edited,
    positive: inverse ? 1 : 0,
    background: { ...background, position: focus },
  };
}

// A blank item for a row added in the table. The server assigns the real id on save
export function newItem(): ISettings {
  return {
    id: 0,
    icon: '',
    text: '',
    additionalText: null,
    positive: 0,
    link: '',
    target: '_self',
    targetNumber: 0,
    selectedPage: null,
    selectedUserGroups: [],
    background: EMPTY_BACKGROUND,
  };
}

// Applies one field changed in a background picker to a background control
export function patchBackground(
  control: FormControl<IBackground>,
  changes: Partial<IBackground>,
): void {
  control.setValue({ ...control.value, ...changes });
  control.markAsDirty();
}

// The picker's asset has no id/isVideo, so keep those from the current asset
export function patchBackgroundAsset(
  control: FormControl<IBackground>,
  asset: Omit<IAsset, 'id' | 'isVideo'> | null,
): void {
  const current = control.value.asset;
  patchBackground(control, {
    asset: asset ? { id: current?.id ?? 0, isVideo: current?.isVideo ?? false, ...asset } : null,
  });
}

export function fillSettingsForm(
  form: SettingsForm,
  fb: NonNullableFormBuilder,
  state: IComponentSettings,
): void {
  form.controls.general.patchValue({
    styles: state.styles,
    display: state.display,
    rowsVisible: state.rowsVisible,
    title: state.title,
    subtitle: state.subtitle,
    inverse: state.darktheme,
    background: state.background,
  });

  form.controls.items.clear();
  for (const item of state.items) {
    form.controls.items.push(createItemForm(fb, item));
  }
}

// Items come from the form rows, so added, removed, duplicated and reordered rows
// are all reflected, in the order shown in the table
export function toSettings(form: SettingsForm): Partial<IComponentSettings> {
  const { inverse, ...general } = form.controls.general.getRawValue();

  return {
    ...general,
    darktheme: inverse,
    items: form.controls.items.controls.map(toItem),
  };
}
