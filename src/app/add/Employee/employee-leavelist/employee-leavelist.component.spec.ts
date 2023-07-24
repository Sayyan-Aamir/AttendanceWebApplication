import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeavelistComponent } from './employee-leavelist.component';

describe('EmployeeLeavelistComponent', () => {
  let component: EmployeeLeavelistComponent;
  let fixture: ComponentFixture<EmployeeLeavelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeavelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
