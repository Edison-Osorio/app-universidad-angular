import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Usuario } from '../../core/models/Usuario';
import { AlumnoService } from './services/alumno.service';
import { Alumno } from '../../core/models/Alumno';
import { Carrera } from '../../core/models/Carrera';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent implements OnInit {
  carrera: any;

  user: any;

  usuario: Usuario = {
    id: undefined,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: '',
  };

  alumno: Alumno = {
    id: undefined,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  };
  constructor(
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    this.styleSidebar();
  }
  styleSidebar() {
    var el: any = document.getElementById('wrapper');
    var toggleButton: any = document.getElementById('menu-toggle');

    toggleButton.onclick = function () {
      el.classList.toggle('toggled');
    };
  }

  obtenerUsuario() {
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;

    this.usuarioService.obtenerUser(emailUser).subscribe(
      (usuario: Usuario) => {
        // console.log('Esta es la respuesta del usuario', usuario);
        this.usuario = usuario;
        this.alumnoService.obtenerAlumno(usuario.id).subscribe(
          (alumno: Alumno) => {
            this.carrera = alumno.carrera?.nombre;
            this.user = alumno.nombre + ' ' + alumno.apellido;
            // console.log('Esta es la varible de user', this.user);
            this.alumno = alumno;
          },
          (err) => {
            console.log('Ocurrio un error al buscar el alumno ', err);
          }
        );
      },
      (err) => {
        console.log('Este es el error ', err);
      }
    );
  }

  asignaturasEmitidas(asignaturas: any) {
    console.log('estas son las asignaturas que se van a emitir ', asignaturas);
    this.alumnoService.emitirAsignaturas.emit(asignaturas);
  }

  actualizarUsuario() {
    console.log('Hola mundo');

    console.log('Este es el alumno ', this.alumno);

    this.usuario.email = this.alumno.email;
    this.usuario.telefono = this.alumno.telefono;

    console.log('Este es el usuario ', this.usuario);

    this.usuarioService.updateUsuario(this.usuario).subscribe(
      (resp: Usuario) => {
        this.alumnoService.updateAlumnos(this.alumno).subscribe(
          (res: Alumno) => {
            console.log('Esta es la respuesta ', this.alumno);
            this.obtenerUsuario();
            Swal.fire(
              'Actualizado',
              'La información de usuario fue actualizada con exito!',
              'success'
            );
          },
          (err) => {
            console.log('Este es el error ', err);
            Swal.fire(
              'Error',
              'No se pudo actualizar la información del usuario ',
              'error'
            );
          }
        );
      },
      (err) => {
        console.log('Este es el error ', err);
        Swal.fire(
          'Error',
          'No se pudo actualizar la información del usuario ',
          'error'
        );
      }
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
