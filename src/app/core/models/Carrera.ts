import { Alumno } from './Alumno';
import { Asignatura } from './Asignatura';
export interface Carrera {
  id?:number | any;
  nombre?:string;
  descripcion?:string;
  alumnos?:Alumno;
  asignaturas?:Asignatura;
  // contenido?:any;
}
