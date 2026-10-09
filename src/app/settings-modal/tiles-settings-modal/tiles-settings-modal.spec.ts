import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesSettingsModal } from './tiles-settings-modal';

describe('TilesSettingsModal', () => {
  let component: TilesSettingsModal;
  let fixture: ComponentFixture<TilesSettingsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilesSettingsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesSettingsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
