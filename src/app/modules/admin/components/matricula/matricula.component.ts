import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Carrera } from '../../../../core/models/Carrera';
import { Alumno } from '../../../../core/models/Alumno';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { Usuario } from '../../../../core/models/Usuario';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit {
  public carreras?: Carrera[];

  carrera: Carrera = {
    id: 0,
  };
  public alumno: Alumno = {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  };

  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: '',
    password: '',
    rol: 'ROLE_ALUMNO',
  };
  constructor(private adminService: AdminService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.listCarreras();
  }

  formSubmit() {
    if (this.alumno.id == 0 || this.alumno.id == null) {
      this.snack.open('El documento del alumno es requerido!!', 'Aceptar', {
        duration: 700,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.alumno.nombre == '' || this.alumno.nombre == null) {
      this.snack.open('El nombre del alumno es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.alumno.apellido == '' || this.alumno.apellido == null) {
      this.snack.open('El apellido del alumno es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.alumno.email == '' || this.alumno.email == null) {
      this.snack.open('El correo del alumno es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.alumno.telefono == '' || this.alumno.telefono == null) {
      this.snack.open('El telefono del alumno es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.alumno.direccion == '' || this.alumno.direccion == null) {
      this.snack.open('La direccion del alumno es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // asignamos una carrera al el alumno
    this.alumno.carrera = this.carrera;

    // Asignamos los valores del alumno para crear el usuario del alumno
    this.usuario.id = this.alumno.id;
    this.usuario.nombre = this.alumno.nombre;
    this.usuario.username = this.alumno.nombre;
    this.usuario.apellido = this.alumno.apellido;
    this.usuario.email = this.alumno.email;
    this.usuario.telefono = this.alumno.telefono;
    this.usuario.password = this.alumno.id;

    this.adminService.addUsuario(this.usuario).subscribe(
      (resp: Usuario) => {
        this.adminService.addAlumnos(this.alumno).subscribe(
          (resp: any) => {
            Swal.fire(
              'Matriculado',
              'Alumno matriculado con exito !',
              'success'
            );
          },
          (err) => {
            console.log('Este es el error ', err);
            Swal.fire(
              'Error',
              'Ocurrio un error al matricular el alumno ',
              'error'
            );
          }
        );
      },
      (err) => {
        console.log('Este es el error  = ', err);
        Swal.fire(
          'Error',
          'No se pudo guardar el usuario en la base de datos, verifique que el documento, o el correo no esten repetidos',
          'error'
        );
      }
    );
  }

  listCarreras() {
    this.adminService.listCarreras().subscribe((carrera: any) => {
      this.carreras = carrera.contenido;
    });
  }
}
