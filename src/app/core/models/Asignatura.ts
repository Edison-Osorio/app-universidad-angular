import { Carrera } from './Carrera';
export interface Asignatura {
  id?:number;
  nombre?:string;
  descripcion?:string;
  carrera?:Carrera;
}
