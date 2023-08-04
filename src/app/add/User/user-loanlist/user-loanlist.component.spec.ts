import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanlistComponent } from './user-loanlist.component';

describe('UserLoanlistComponent', () => {
  let component: UserLoanlistComponent;
  let fixture: ComponentFixture<UserLoanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoanlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
