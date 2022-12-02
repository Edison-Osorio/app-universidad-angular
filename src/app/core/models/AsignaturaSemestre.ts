import { Asignatura } from './Asignatura';
import { Semestre } from './Semestre';
export interface AsignaturaSemestre {
  id?:number;
  asignatura?:Asignatura;
  semestre?:Semestre;
  alumnoId: number;
  
}
