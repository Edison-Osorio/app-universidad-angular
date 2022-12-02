import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../core/models/Usuario';
import { AuthService } from './services/auth.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Rol } from '../../core/models/Rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public user: any = {
    usernameOrEmail: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    if (this.user.usernameOrEmail == '' || this.user.usernameOrEmail == null) {
      this.snack.open('El nombre de usuario es requerido!!', 'Aceptar', {
        duration: 700,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('La contraseña del usuario es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    this.authService.login(this.user).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.tokenDeAcceso);

        let decodeToken: any = {};
        decodeToken = decode(res.tokenDeAcceso);
        const emailUser = decodeToken.sub;

        this.usuarioService
          .obtenerUser(emailUser)
          .subscribe((usuario: Usuario) => {
            
            let roles: any = usuario.authorities;
            switch (roles[0].authority) {
              case 'ROLE_ADMIN':
                this.router.navigate(['/admin']);
                break;
              case 'ROLE_ALUMNO':
                this.router.navigate(['/alumno']);
                break;
              default:
                this.router.navigate(['/auth']);
                break;
            }
          });
      },
      (error: any) => {
        Swal.fire('Error', 'Credenciales erroneas', 'error');
      }
    );
  }
}
