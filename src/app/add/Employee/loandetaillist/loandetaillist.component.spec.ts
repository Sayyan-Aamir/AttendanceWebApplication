import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandetaillistComponent } from './loandetaillist.component';

describe('LoandetaillistComponent', () => {
  let component: LoandetaillistComponent;
  let fixture: ComponentFixture<LoandetaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoandetaillistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
