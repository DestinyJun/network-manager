import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailInfoComponent } from './well-detail-info.component';

describe('WellDetailInfoComponent', () => {
  let component: WellDetailInfoComponent;
  let fixture: ComponentFixture<WellDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
