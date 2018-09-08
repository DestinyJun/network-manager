import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDeleteComponent } from './well-delete.component';

describe('WellDeleteComponent', () => {
  let component: WellDeleteComponent;
  let fixture: ComponentFixture<WellDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
