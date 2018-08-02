import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellOutInfoComponent } from './well-out-info.component';

describe('WellOutInfoComponent', () => {
  let component: WellOutInfoComponent;
  let fixture: ComponentFixture<WellOutInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellOutInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellOutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
