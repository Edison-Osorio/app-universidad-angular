import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../core/models/Usuario';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  user:any

  ngOnInit(): void {
    this.obtenerUsuario()
  }
   obtenerUsuario() {
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;

    this.usuarioService.obtenerUser(emailUser).subscribe(
      (usuario: Usuario) => {
        this.user = usuario.nombre + ' ' + usuario.apellido;
      },
      (err) => {
        console.log('Este es el error ', err);
      }
    );
  }

}
