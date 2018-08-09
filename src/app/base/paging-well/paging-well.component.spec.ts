import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingWellComponent } from './paging-well.component';

describe('PagingWellComponent', () => {
  let component: PagingWellComponent;
  let fixture: ComponentFixture<PagingWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
