import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno.component';
import { ListAsignaturasComponent } from './components/list-asignaturas/list-asignaturas.component';
import { AsignaturasSemestreComponent } from './components/asignaturas-semestre/asignaturas-semestre.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: AlumnoComponent, children:[
  {path:'', component:DashboardComponent},
  {path:'list-asignaturas', component:ListAsignaturasComponent},
  {path:'asignatura-semestre', component:AsignaturasSemestreComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
