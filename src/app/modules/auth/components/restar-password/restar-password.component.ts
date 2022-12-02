import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Usuario } from '../../../../core/models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restar-password',
  templateUrl: './restar-password.component.html',
  styleUrls: ['./restar-password.component.css'],
})
export class RestarPasswordComponent implements OnInit {
  user: any = {
    usernameOrEmail: '',
    password: '',
  };

  usuario: any={
    id: undefined,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: ''
  };
  showPassword: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private snack: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {}

  buscarUsuario(email: any) {
    if (this.user.usernameOrEmail == '' || this.user.usernameOrEmail == null) {
      this.snack.open('El correo del usuario es requerido!!', 'Aceptar', {
        duration: 700,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    this.usuarioService.obtenerUser(email).subscribe((resp: any) => {
      console.log('Esta es la respuesta ', resp);
      if (resp == null) {
        Swal.fire(
          'Error',
          'Usuario no encontrado, revise el correo ingresado que si sea correcto',
          'error'
        );
      } else {
        this.showPassword = true;
        this.usuario = resp;
      }
    });
  }
  actualizarPassword() {
    this.usuario.password = this.user.password;
    delete this.usuario.authorities
    delete this.usuario.accountNonExpired
    delete this.usuario.accountNonLocked
    delete this.usuario.credentialsNonExpired
    console.log("este es el usuario", this.usuario);

    this.usuarioService.updatePassword(this.usuario).subscribe((resp:any)=>{
      this.router.navigate(['auth'])
      Swal.fire('Actualizado', 'Se actualizo con exito la contraseña', 'success')
    },
    (err)=>{
      console.log('Este es el error ', err);
      Swal.fire('Error','No se pudo actualizar la contraseña','error')
      
    }) 
  }
}
