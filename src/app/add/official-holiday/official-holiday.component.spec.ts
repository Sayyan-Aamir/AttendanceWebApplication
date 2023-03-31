import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialHolidayComponent } from './official-holiday.component';

describe('OfficialHolidayComponent', () => {
  let component: OfficialHolidayComponent;
  let fixture: ComponentFixture<OfficialHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
