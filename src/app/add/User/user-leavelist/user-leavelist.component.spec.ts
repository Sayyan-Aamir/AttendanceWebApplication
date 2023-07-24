import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeavelistComponent } from './user-leavelist.component';

describe('UserLeavelistComponent', () => {
  let component: UserLeavelistComponent;
  let fixture: ComponentFixture<UserLeavelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLeavelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
