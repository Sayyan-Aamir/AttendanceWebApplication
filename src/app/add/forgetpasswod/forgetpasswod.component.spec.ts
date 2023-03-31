import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswodComponent } from './forgetpasswod.component';

describe('ForgetpasswodComponent', () => {
  let component: ForgetpasswodComponent;
  let fixture: ComponentFixture<ForgetpasswodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpasswodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
