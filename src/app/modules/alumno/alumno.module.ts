import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { HttpClientModule } from '@angular/common/http';
import { ListAsignaturasComponent } from './components/list-asignaturas/list-asignaturas.component';
import { AsignaturasSemestreComponent } from './components/asignaturas-semestre/asignaturas-semestre.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AlumnoComponent,
    ListAsignaturasComponent,
    AsignaturasSemestreComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    HttpClientModule,
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
  ]
})
export class AlumnoModule { }
