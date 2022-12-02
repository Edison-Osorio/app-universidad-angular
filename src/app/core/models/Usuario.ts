import { Rol } from './Rol';
export interface Usuario {
  id:number | any;
  nombre:string;
  apellido:string;
  username:string;
  email:string;
  telefono:string;
  password?:string;
  rol?:String;
  roles?:Rol[];
  authorities?:any;
}
