import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellAddComponent } from './well-add.component';

describe('WellAddComponent', () => {
  let component: WellAddComponent;
  let fixture: ComponentFixture<WellAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
