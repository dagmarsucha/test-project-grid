import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGeneral } from './tab-general';

describe('TabGeneral', () => {
  let component: TabGeneral;
  let fixture: ComponentFixture<TabGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(TabGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
