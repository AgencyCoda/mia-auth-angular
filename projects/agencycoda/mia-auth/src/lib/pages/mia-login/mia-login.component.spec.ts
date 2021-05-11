import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaLoginComponent } from './mia-login.component';

describe('MiaLoginComponent', () => {
  let component: MiaLoginComponent;
  let fixture: ComponentFixture<MiaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
