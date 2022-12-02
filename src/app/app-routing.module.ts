import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from './core/guards/rol.guard';

const routes: Routes = [
  {path:'', redirectTo:'auth', pathMatch:'full'},
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),canActivate:[RolGuard], data:{expectedRole:'ROLE_ADMIN'}
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'alumno',
    loadChildren: () =>
      import('./modules/alumno/alumno.module').then((m) => m.AlumnoModule), canActivate:[RolGuard], data:{expectedRole:'ROLE_ALUMNO'}
  },{path:'**', redirectTo:'auth', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
