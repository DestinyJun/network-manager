import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellEnterInfoComponent } from './well-enter-info.component';

describe('WellEnterInfoComponent', () => {
  let component: WellEnterInfoComponent;
  let fixture: ComponentFixture<WellEnterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellEnterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellEnterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
