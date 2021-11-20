import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaUserCardComponent } from './mia-user-card.component';

describe('MiaUserCardComponent', () => {
  let component: MiaUserCardComponent;
  let fixture: ComponentFixture<MiaUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
