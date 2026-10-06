import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileView } from './tile-view';

describe('TileView', () => {
  let component: TileView;
  let fixture: ComponentFixture<TileView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileView],
    }).compileComponents();

    fixture = TestBed.createComponent(TileView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
