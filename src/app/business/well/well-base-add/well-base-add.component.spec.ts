import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellBaseAddComponent } from './well-base-add.component';

describe('WellBaseAddComponent', () => {
  let component: WellBaseAddComponent;
  let fixture: ComponentFixture<WellBaseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellBaseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellBaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
