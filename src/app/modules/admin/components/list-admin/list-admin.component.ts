import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../../../core/models/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css'],
})
export class ListAdminComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  displayedColumns: string[] = [
    'documento',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource: any;

  pageNumber: number = 0;
  pageSize: number = 10;

  totalNumberPages!: number;

  showButtonLeft: boolean = false;
  showButtonRight: boolean = true;

  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: '',
  };

  constructor(private adminService: AdminService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.listUsuarios(this.pageNumber, this.pageSize);
  }

  listUsuarios(pageNumber: number, pageSize: number) {
    this.adminService
      .listUsuarios(pageNumber, pageSize)
      .subscribe((usuario: any) => {

        this.totalNumberPages = usuario.totalPaginas;
        
        this.dataSource = usuario.contenido
        .filter((item: any) => item.authorities[0].authority == 'ROLE_ADMIN');
        let roles = usuario.contenido.roles;        
      });
  }

  refresh() {
    this.showAdd = true;
    this.showUpdate = false;
    this.usuario = {
      id: '',
      nombre: '',
      apellido: '',
      username: '',
      email: '',
      telefono: '',
      password: '',
      rol: 'ROLE_ADMIN',
    };
  }

  changeAdmin(element: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.usuario = element;
  }

  formsSubmitAdmin() {
    if (this.usuario.id == '' || this.usuario.id == null) {
      this.snack.open(
        'El identificador del usuario es requerido!!',
        'Aceptar',
        {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }
    if (this.usuario.nombre == '' || this.usuario.nombre == null) {
      this.snack.open('El nombre del usuario es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.usuario.apellido == '' || this.usuario.apellido == null) {
      this.snack.open('El apellido del usuario es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.usuario.email == '' || this.usuario.email == null) {
      this.snack.open('El correo del usuario es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.usuario.telefono == '' || this.usuario.telefono == null) {
      this.snack.open('El telefono del usuario es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.showAdd) {
      this.usuario.password = this.usuario.id;
      this.usuario.username = this.usuario.nombre;
      this.adminService.addUsuario(this.usuario).subscribe(
        (usuario: Usuario) => {
          this.dataSource.push(usuario);
          document.getElementById('cancel')?.click();
          this.listUsuarios(this.pageNumber, this.pageSize);
          Swal.fire(
            'Guardado',
            `Se guardo con exito el nuevo administrador`,
            'success'
          );
        },
        (err) => {
          console.log('Este es el error = ', err);
          Swal.fire(
            'Error',
            `Ocurrio un error al agregar un nuevo administrador`,
            'error'
          );
        }
      );
    } else if (this.showUpdate) {
      this.adminService.updateUsuario(this.usuario).subscribe(
        (usuario: Usuario) => {
          document.getElementById('cancel')?.click();
          this.listUsuarios(this.pageNumber, this.pageSize);
          Swal.fire(
            'Actualizado',
            'Se actualizo la información del administrador con exito!',
            'success'
          );
        },
        (err) => {
          console.log('Este es el error ', err);
          Swal.fire(
            'Error',
            'No se pudo actualizar la información del administrador',
            'error'
          );
        }
      );
    }
  }
  deleteAdmin(element: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-3',
        cancelButton: 'btn btn-danger ',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: '¿Esta seguro de eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar administrador',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const index = this.dataSource.findIndex(
            (user: any) => user.id == element.id
          );
          this.adminService.deleteUsuario(element.id).subscribe(
            (resp: any) => {
              this.dataSource.slice(index, 1);
              this.listUsuarios(this.pageNumber, this.pageSize);
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Se ha eliminado el administrador con exito',
                'success'
              );
            },
            (err) => {
              console.log('Este es el erro ', err);
              Swal.fire(
                'Error',
                'No se pudo eliminar el administrador ',
                'error'
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Se ha cancelado la operación',
            'error'
          );
        }
      });
  }
  pageLeft() {
    if (this.pageNumber == 0) {
      this.showButtonLeft = false;
    } else {
      this.showButtonLeft = false;
    }
    if (this.pageNumber < this.totalNumberPages) {
      this.showButtonRight = true;
    }
    --this.pageNumber;
    this.listUsuarios(this.pageNumber, this.pageSize);
  }

  pageRight() {
    // this.showButtonLeft = true
    // ++this.totalNumberPages

    if (this.pageNumber < this.totalNumberPages) {
      this.showButtonRight = false;
    } else {
      this.showButtonRight = true;
    }
    if (this.pageNumber >= 0) {
      this.showButtonLeft = true;
    }
    ++this.pageNumber;
    this.listUsuarios(this.pageNumber, this.pageSize);
  }
}
