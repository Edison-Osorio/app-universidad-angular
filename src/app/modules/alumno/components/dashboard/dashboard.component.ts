import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import decode from 'jwt-decode';
import { Usuario } from '../../../../core/models/Usuario';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../../../core/models/Alumno';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }
  obtenerUsuario() {
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;

    this.usuarioService.obtenerUser(emailUser).subscribe(
      (usuario: Usuario) => {
        this.alumnoService.obtenerAlumno(usuario.id).subscribe(
          (alumno: Alumno) => {
            this.user = alumno.nombre + ' ' + alumno.apellido;
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
}
