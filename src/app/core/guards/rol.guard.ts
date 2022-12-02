import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlumnoService } from '../../modules/alumno/services/alumno.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import decode from 'jwt-decode';
import { Usuario } from '../models/Usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data['expectedRole'];
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;
    let user: any;
    let rol: any;
    this.usuarioService.obtenerUser(emailUser).subscribe((usuario: any) => {
      user = usuario;
      rol = usuario.authorities[0].authority;
      if (!sessionStorage.getItem('token') || rol != expectedRole) {
        Swal.fire(
          'Error',
          'No esta autorizado para ingresar a esta vista, por favor inicie sesion',
          'error'
        );
        this.router.navigateByUrl('auth');
        return false;
      }
      return true;
    });

    return true;
  }
}
