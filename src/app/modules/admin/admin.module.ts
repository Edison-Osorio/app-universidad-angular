import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CarreraComponent } from './components/carrera/carrera.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InjectSessionInterceptor } from '../../core/interceptors/inject-session.interceptor';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AlumnosComponent,
    ListAdminComponent,
    MatriculaComponent,
    CarreraComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
})
export class AdminModule {}
