import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellSensorInfoComponent } from './well-sensor-info.component';

describe('WellSensorInfoComponent', () => {
  let component: WellSensorInfoComponent;
  let fixture: ComponentFixture<WellSensorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellSensorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellSensorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
