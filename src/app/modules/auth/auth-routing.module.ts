import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RestarPasswordComponent } from './components/restar-password/restar-password.component';

const routes: Routes = [{ path: '', component: AuthComponent },{path:'restar-password', component:RestarPasswordComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
