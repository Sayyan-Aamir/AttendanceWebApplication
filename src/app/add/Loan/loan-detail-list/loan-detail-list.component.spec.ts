import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailListComponent } from './loan-detail-list.component';

describe('LoanDetailListComponent', () => {
  let component: LoanDetailListComponent;
  let fixture: ComponentFixture<LoanDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
