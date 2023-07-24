import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHolidayaddComponent } from './office-holidayadd.component';

describe('OfficeHolidayaddComponent', () => {
  let component: OfficeHolidayaddComponent;
  let fixture: ComponentFixture<OfficeHolidayaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeHolidayaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHolidayaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
