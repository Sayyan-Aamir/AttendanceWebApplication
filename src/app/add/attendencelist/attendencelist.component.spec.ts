import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendencelistComponent } from './attendencelist.component';

describe('AttendencelistComponent', () => {
  let component: AttendencelistComponent;
  let fixture: ComponentFixture<AttendencelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendencelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendencelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
