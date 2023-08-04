import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTasklistComponent } from './employee-tasklist.component';

describe('EmployeeTasklistComponent', () => {
  let component: EmployeeTasklistComponent;
  let fixture: ComponentFixture<EmployeeTasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
