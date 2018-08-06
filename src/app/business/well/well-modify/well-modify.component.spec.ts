import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellModifyComponent } from './well-modify.component';

describe('WellModifyComponent', () => {
  let component: WellModifyComponent;
  let fixture: ComponentFixture<WellModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
