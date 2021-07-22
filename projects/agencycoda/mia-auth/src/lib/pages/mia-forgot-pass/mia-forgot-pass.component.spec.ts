import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaForgotPassComponent } from './mia-forgot-pass.component';

describe('MiaForgotPassComponent', () => {
  let component: MiaForgotPassComponent;
  let fixture: ComponentFixture<MiaForgotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaForgotPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
