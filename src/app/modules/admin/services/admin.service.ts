import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../core/models/Alumno';
import { Carrera } from 'src/app/core/models/Carrera';
import { Usuario } from '../../../core/models/Usuario';
import { Asignatura } from '../../../core/models/Asignatura';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  // CRUD de alumnos
  listAlumnos(pageNumber: number, pageSize: number): Observable<Alumno[]> {
    // console.log('Este es le header que se va a injectar = ', this.header);

    return this.http.get<Alumno[]>(
      `${this.baseUrl}/alumnos?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  addAlumnos(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.baseUrl}/alumnos`, alumno);
  }

  updateAlumnos(alumno:Alumno):Observable<Alumno>{
  return this.http.put<Alumno>(`${this.baseUrl}/alumnos/${alumno.id}`, alumno)
  }

  deleteAlumno(alumno:any){
return this.http.delete(`${this.baseUrl}/alumnos/${alumno.id}`)
  }

  // CRUD de Usuarios

  listUsuarios(pageNumber: number, pageSize: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${this.baseUrl}/auth/list-admin?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=roles&sortDir=desc`
    );
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/auth/registrar`, usuario);
  }

  updateUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}/auth/update-user/${usuario.id}`, usuario)
  }

  deleteUsuario(usuarioId:number){
    return this.http.delete(`${this.baseUrl}/auth/delete-user/${usuarioId}`)
  }

  // CRUD de carreras
  listCarrerasPaginator(
    pageNumber: number,
    pageSize: number
  ): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.baseUrl}/carreras?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  listCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.baseUrl}/carreras?sortBy=asignaturas&sortDir=asc`
    );
  }

  addCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(`${this.baseUrl}/carreras`, carrera);
  }

  // CRUD de las asignaturas
  addAsignatura(carreraId:any ,asignatura:Asignatura):Observable<Asignatura>{
    return this.http.post<Asignatura>(`${this.baseUrl}/asignaturas/${carreraId}`, asignatura )
  }

  updateAsignatura(asignatura:Asignatura):Observable<Asignatura>{
    console.log('Esta es la ruta',`${this.baseUrl}/asignaturas/${asignatura.id}`);
    return this.http.put<Asignatura>(`${this.baseUrl}/asignaturas/${asignatura.id}`, asignatura)
  }

  deleteAsignatura(asignaturaId:number){
    return this.http.delete(`${this.baseUrl}/asignaturas/${asignaturaId}`)
  }

}
