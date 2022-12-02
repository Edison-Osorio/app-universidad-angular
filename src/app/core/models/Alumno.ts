import { Carrera } from './Carrera';
export interface Alumno {
  id:number | any;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;
  direccion:string;
  carrera?:Carrera;

}
