import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaAuthComponent } from './mia-auth.component';

describe('MiaAuthComponent', () => {
  let component: MiaAuthComponent;
  let fixture: ComponentFixture<MiaAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
