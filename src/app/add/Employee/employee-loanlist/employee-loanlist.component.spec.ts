import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoanlistComponent } from './employee-loanlist.component';

describe('EmployeeLoanlistComponent', () => {
  let component: EmployeeLoanlistComponent;
  let fixture: ComponentFixture<EmployeeLoanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLoanlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
