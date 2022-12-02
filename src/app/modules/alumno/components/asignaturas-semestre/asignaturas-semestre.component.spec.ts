import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasSemestreComponent } from './asignaturas-semestre.component';

describe('AsignaturasSemestreComponent', () => {
  let component: AsignaturasSemestreComponent;
  let fixture: ComponentFixture<AsignaturasSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturasSemestreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
