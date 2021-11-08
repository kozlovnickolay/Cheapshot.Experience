import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersBottomSheetComponent } from './layers-bottom-sheet.component';

describe('LayersBottomSheetComponent', () => {
  let component: LayersBottomSheetComponent;
  let fixture: ComponentFixture<LayersBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
