import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPage } from './grid-page';

describe('GridPage', () => {
  let component: GridPage;
  let fixture: ComponentFixture<GridPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GridPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
