import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInformationComponent } from './well-information.component';

describe('WellInformationComponent', () => {
  let component: WellInformationComponent;
  let fixture: ComponentFixture<WellInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
