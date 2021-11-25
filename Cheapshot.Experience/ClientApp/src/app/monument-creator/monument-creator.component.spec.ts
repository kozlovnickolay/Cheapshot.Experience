import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentCreatorComponent } from './monument-creator.component';

describe('MonumentCreatorComponent', () => {
  let component: MonumentCreatorComponent;
  let fixture: ComponentFixture<MonumentCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonumentCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
