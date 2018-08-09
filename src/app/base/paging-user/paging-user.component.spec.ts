import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingUserComponent } from './paging-user.component';

describe('PagingUserComponent', () => {
  let component: PagingUserComponent;
  let fixture: ComponentFixture<PagingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
