import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskdetaillistComponent } from './employee-taskdetaillist.component';

describe('EmployeeTaskdetaillistComponent', () => {
  let component: EmployeeTaskdetaillistComponent;
  let fixture: ComponentFixture<EmployeeTaskdetaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTaskdetaillistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTaskdetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
