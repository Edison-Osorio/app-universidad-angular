import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Usuario } from '../../core/models/Usuario';
import { Alumno } from '../../core/models/Alumno';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  user: any;

  constructor(
    private usuarioService: UsuarioService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.styleSidebar();
    this.obtenerUsuario();
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
        this.user = usuario;
      },
      (err) => {
        console.log('Este es el error ', err);
      }
    );
  }

  actualizarUsuario() {
    console.log('Hola mundo actualizado');
    console.log('Este es el usuario actualizado ', this.user);
    this.adminService.updateUsuario(this.user).subscribe(
      (resp: Usuario) => {
        console.log('Esta es la respuesta ', resp);
        this.obtenerUsuario();
        Swal.fire(
          'Actualizado',
          'Se actualizo la información del usuario con exito!',
          'success'
        );
      },
      (err) => {
        console.log('Este es el error ', err);
        Swal.fire(
          'Error',
          'Ocurrio un error al actualizar la información del usuario ',
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
