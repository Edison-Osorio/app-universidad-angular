import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../../../core/models/Carrera';
import { AdminService } from '../../services/admin.service';
import { Asignatura } from '../../../../core/models/Asignatura';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;

  public carreras?: Carrera[];

  pageNumber: number = 0;
  pageSize: number = 10;

  totalNumberPages!: number;

  public asignturas?: Asignatura[];

  carrera: any;

  newCarrera: Carrera = {
    nombre: '',
    descripcion: '',
  };

  asignatura: Asignatura = {
    id: 0,
    nombre: '',
    descripcion: '',
    carrera: undefined,
  };

  constructor(private adminService: AdminService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.listCarreras(this.pageNumber, this.pageSize);
  }

  listCarreras(pageNumber: number, pageSize: number) {
    this.adminService
      .listCarrerasPaginator(pageNumber, pageSize)
      .subscribe((carrera: any) => {
        this.carreras = carrera.contenido;
      });
  }

  listAsignaturas(carrera: any) {
    this.carrera = carrera;
    this.asignturas = carrera.asignaturas;
  }

  ifAdd() {
    this.showAdd = true;
    this.showUpdate = false;
    this.asignatura = {
      id: 0,
      nombre: '',
      descripcion: '',
      carrera: undefined,
    };
  }

  ifUpdate(asignatura: Asignatura) {
    this.showUpdate = true;
    this.showAdd = false;
    this.asignatura = asignatura;
  }

  formSubmit() {
    if (this.newCarrera.nombre == '' || this.newCarrera.nombre == null) {
      this.snack.open('El nombre de la carrera es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.newCarrera.descripcion == '' ||
      this.newCarrera.descripcion == null
    ) {
      this.snack.open(
        'La descripcion de la carrera es  requerida!!',
        'Aceptar',
        {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }

    this.adminService.addCarrera(this.newCarrera).subscribe(
      (carrera: Carrera) => {
        document.getElementById('cancel')?.click();
        this.listCarreras(this.pageNumber, this.pageSize);
      },
      (err) => {
        console.log('Ocurrio un error al agregar una nueva carrera');
        Swal.fire(
          'Error',
          'Ocurrio un error al agregar una nueva carrera ',
          'error'
        );
      }
    );
  }

  formSubmitAsignatura() {
    if (this.asignatura.nombre == '' || this.asignatura.nombre == null) {
      this.snack.open('El nombre de la asignatura es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.asignatura.descripcion == '' ||
      this.asignatura.descripcion == null
    ) {
      this.snack.open(
        'La descripcion de la asignatura es  requerida!!',
        'Aceptar',
        {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }

    delete this.carrera.asignaturas;
    // this.asignatura.carrera = this.carrera

    if (this.showAdd) {
      this.adminService
        .addAsignatura(this.carrera.id, this.asignatura)
        .subscribe(
          (asignatura: Asignatura) => {
            this.asignturas?.push(asignatura);
            document.getElementById('cerrar')?.click();
            this.listCarreras(this.pageNumber, this.pageSize);
            Swal.fire(
              'Guardado',
              `Se le  asigno con exito la asignatura a la carrera ${this.carrera.nombre}`,
              'success'
            );
          },
          (err) => {
            console.log('Este es el error = ', err);
            Swal.fire(
              'Error',
              `Ocurrio un error al asignarle la asignatura la carrera ${this.carrera.nombre}`,
              'error'
            );
          }
        );
    } else if (this.showUpdate) {
      this.adminService.updateAsignatura(this.asignatura).subscribe(
        (asignatura: Asignatura) => {
          Swal.fire(
            'Actualizado',
            'Se actualizo la información de la asignatura con exito!',
            'success'
          );
        },
        (err) => {
          console.log('Este es el error ', err);
          Swal.fire(
            'Error',
            'No se pudo actualizar la información de la asignatura ',
            'error'
          );
        }
      );
    }
  }

  deleteAsignatura(asignaturaId: any) {
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
        confirmButtonText: 'Si, eliminar asignatura',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const index = this.asignturas?.findIndex(
            (asignatura) => asignatura.id == asignaturaId
          );
          this.adminService.deleteAsignatura(asignaturaId).subscribe(
            (resp: any) => {
              this.asignturas?.slice(index, 1);
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Se ha eliminado la materia',
                'success'
              );
            },
            (err) => {
              console.log('Este es el erro ', err);
              Swal.fire('Error', 'No se pudo eliminar la asignatura ', 'error');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Se ha cancelado la operación',
            'error'
          );
        }
      });
  }
}
