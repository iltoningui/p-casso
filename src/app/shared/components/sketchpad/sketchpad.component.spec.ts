import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchpadComponent } from './sketchpad.component';

describe('SketchpadComponent', () => {
  let component: SketchpadComponent;
  let fixture: ComponentFixture<SketchpadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SketchpadComponent]
    });
    fixture = TestBed.createComponent(SketchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
