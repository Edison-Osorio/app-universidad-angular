import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../core/models/Alumno';
import { AsignaturaSemestre } from '../../../core/models/AsignaturaSemestre';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  @Output() emitirAsignaturas: EventEmitter<any> = new EventEmitter();

  private readonly baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  obtenerAlumno(alumnoId: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseUrl}/alumnos/${alumnoId}`);
  }
  updateAlumnos(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(
      `${this.baseUrl}/alumnos/${alumno.id}`,
      alumno
    );
  }
  // CRUD de asignatura por semestre
  obtenerAsignaturasSemestre() {
    return this.http.get(`${this.baseUrl}/asignaturaSemestre`);
  }

  addAsignaturaSemestre(asignaturaSemestre: AsignaturaSemestre) {
    return this.http.post(
      `${this.baseUrl}/asignaturaSemestre`,
      asignaturaSemestre
    );
  }

  updateAsignaturaSemestre(asignaturaSemestre: AsignaturaSemestre) {
    return this.http.put(
      `${this.baseUrl}/asignaturaSemestre/${asignaturaSemestre.id}`,
      asignaturaSemestre
    );
  }

  // CRUD de semestre
  listSemestre() {
    return this.http.get(`${this.baseUrl}/semestres`);
  }
}
