import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestarPasswordComponent } from './restar-password.component';

describe('RestarPasswordComponent', () => {
  let component: RestarPasswordComponent;
  let fixture: ComponentFixture<RestarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestarPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
