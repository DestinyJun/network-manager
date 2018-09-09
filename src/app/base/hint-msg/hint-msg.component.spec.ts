import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintMsgComponent } from './hint-msg.component';

describe('HintMsgComponent', () => {
  let component: HintMsgComponent;
  let fixture: ComponentFixture<HintMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
