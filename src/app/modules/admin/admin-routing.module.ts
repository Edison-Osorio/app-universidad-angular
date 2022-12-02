import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CarreraComponent } from './components/carrera/carrera.component';

const routes: Routes = [{ path: '', component: AdminComponent, children:[
 {path:'', component:DashboardComponent},
 {path:'list-admin', component:ListAdminComponent},
 {path:'carrera', component:CarreraComponent},
 {path:'alumnos',component:AlumnosComponent},
 {path:'matricula', component:MatriculaComponent, pathMatch:'full'},
 {path:'**', redirectTo:'', pathMatch:'full'}

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
