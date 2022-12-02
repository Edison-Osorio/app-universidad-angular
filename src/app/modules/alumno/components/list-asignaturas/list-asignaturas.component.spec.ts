import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsignaturasComponent } from './list-asignaturas.component';

describe('ListAsignaturasComponent', () => {
  let component: ListAsignaturasComponent;
  let fixture: ComponentFixture<ListAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAsignaturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
