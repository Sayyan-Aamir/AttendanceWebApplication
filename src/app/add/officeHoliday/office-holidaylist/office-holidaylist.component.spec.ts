import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHolidaylistComponent } from './office-holidaylist.component';

describe('OfficeHolidaylistComponent', () => {
  let component: OfficeHolidaylistComponent;
  let fixture: ComponentFixture<OfficeHolidaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeHolidaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHolidaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
