import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Alumno } from '../../../../core/models/Alumno';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../../core/models/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
  showButtonLeft: boolean = false;
  showButtonRight: boolean = true;
  displayedColumns: string[] = [
    'documento',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'direccion',
    'carrera',
    'acciones',
  ];
  dataSource: any;
  pageNumber: number = 0;
  pageSize: number = 10;

  totalNumberPages!: number;

  alumno: Alumno = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  };

  usuario: Usuario = {
    id: undefined,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: '',
  };
  constructor(private adminService: AdminService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.listAlumnos(this.pageNumber, this.pageSize);
  }

  listAlumnos(pageNumber: number, pageSize: number) {
    this.adminService
      .listAlumnos(pageNumber, pageSize)
      .subscribe((alumno: any) => {
        this.dataSource = alumno.contenido;
        this.totalNumberPages = alumno.totalPaginas;
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
    this.listAlumnos(this.pageNumber, this.pageSize);
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
    this.listAlumnos(this.pageNumber, this.pageSize);
  }

  refresh() {}

  changeAlumno(element: any) {
    this.alumno = element;
  }

  updateAlumno() {
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

    this.usuario.id = this.alumno.id;
    this.usuario.nombre = this.alumno.nombre;
    this.usuario.apellido = this.alumno.apellido;
    this.usuario.email = this.alumno.email;
    this.usuario.telefono = this.alumno.telefono;

    this.adminService.updateUsuario(this.usuario).subscribe(
      (usuario: Usuario) => {
        this.adminService.updateAlumnos(this.alumno).subscribe(
          (alumno: Alumno) => {
            this.listAlumnos(this.pageNumber, this.pageSize);
            document.getElementById('cancel')?.click();
            Swal.fire(
              'Actualizado',
              'Se actualizó la información del usuario con exito!',
              'success'
            );
          },
          (err) => {
            console.log('Este es el error ', err);
            Swal.fire(
              'Error',
              'No se pudo actualizar la información del alumno',
              'error'
            );
          }
        );
      },
      (err) => {
        console.log('Este es el error ', err);
        Swal.fire(
          'Error',
          'No se pudo actualizar la información del alumno',
          'error'
        );
      }
    );
  }

  deleteAlumno(element:any){
console.log('Se esta eliminando');
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
          this.adminService.deleteAlumno(element).subscribe((resp:any)=>{
            this.dataSource.slice(index, 1);
            
            this.listAlumnos(this.pageNumber, this.pageSize);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Se ha eliminado el alumno con exito',
              'success'
            );
          })
        },
        (err) => {
          console.log('Este es el erro ', err);
          Swal.fire(
            'Error',
            'No se pudo eliminar el alumno ',
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

}
