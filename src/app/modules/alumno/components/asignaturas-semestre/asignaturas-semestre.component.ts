import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import decode from 'jwt-decode';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../core/models/Usuario';
import { Asignatura } from '../../../../core/models/Asignatura';
import { Semestre } from '../../../../core/models/Semestre';
import { Alumno } from '../../../../core/models/Alumno';
import Swal from 'sweetalert2';
import { AsignaturaSemestre } from 'src/app/core/models/AsignaturaSemestre';

@Component({
  selector: 'app-asignaturas-semestre',
  templateUrl: './asignaturas-semestre.component.html',
  styleUrls: ['./asignaturas-semestre.component.css'],
})
export class AsignaturasSemestreComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'semestre',
  ];
  // 'acciones',

  totalNumberPages: any;
  alumnoId: any;

  public asignaturas: any | [];
  semestres: any;

  listAsginaturaSemestre: any;
  changeAllAsignatura: any;
  dataSource: any;

  asignturaSemestre: any;

  asignSemestre: AsignaturaSemestre = {
    id: 0,
    asignatura: undefined,
    semestre: undefined,
    alumnoId: 0,
  };

  asignatura: Asignatura = {
    id: 0,
    nombre: '',
  };
  semestre: Semestre = {
    id: 0,
    nombre: '',
  };

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    this.listAsignaturaSemestre();
    this.listSemestres();
  }

  obtenerUsuario() {
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;

    this.usuarioService.obtenerUser(emailUser).subscribe(
      (usuario: Usuario) => {
        this.alumnoId = usuario.id;
        this.alumnoService.obtenerAlumno(usuario.id).subscribe(
          (alumno: Alumno) => {
            this.asignaturas = alumno.carrera?.asignaturas;
            this.changeAllAsignatura = this.asignaturas;

            for (let i = 0; i < this.listAsginaturaSemestre.length; i++) {
              const element = this.listAsginaturaSemestre[i];

              this.asignaturas = this.asignaturas.filter(
                (item: any) => item.id != element.asignatura.id
              );
            }
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

  listAsignaturaSemestre() {
    this.alumnoService.obtenerAsignaturasSemestre().subscribe((resp: any) => {
      this.listAsginaturaSemestre = resp;

      this.listAsginaturaSemestre = resp.filter(
        (item: any) => item.alumnoId == this.alumnoId
      );
      this.dataSource = this.listAsginaturaSemestre;
    });
  }

  listSemestres() {
    this.alumnoService.listSemestre().subscribe((resp: any) => {
      this.semestres = resp;
    });
  }

  refresh() {
    this.asignatura = {
      id: 0,
    };
    this.semestre = {
      id: 0,
    };
    this.asignSemestre = {
      asignatura: undefined,
      semestre: undefined,
      alumnoId: this.alumnoId,
    };
  }

  addAsignaturaSemestre() {
    this.asignSemestre.asignatura = this.asignatura;
    this.asignSemestre.semestre = this.semestre;

    this.alumnoService.addAsignaturaSemestre(this.asignSemestre).subscribe(
      (resp: any) => {
        this.listAsignaturaSemestre();
        this.obtenerUsuario();
        document.getElementById('cancel')?.click();
        Swal.fire('Guardado', 'Registro tú eleccion ', 'success');
      },
      (err) => {
        console.log('Este estes es el error ', err);
        Swal.fire('Error', 'Ocurrio un error', 'error');
      }
    );
  }

  changeAsignturaSemestre(element: any) {
    this.asignturaSemestre = element;
    this.asignatura.id = element.asignatura.id;
    this.semestre.id = element.semestre.id;
  }

  updateAsignaturaSemestre() {
    console.log('Esta es la asignatura ', this.asignatura);
    console.log('Este es el semestre ', this.semestre);

    this.asignturaSemestre.semestre = this.semestre;

    console.log('Esta es la asigntura a actualizar ', this.asignturaSemestre);

    this.alumnoService
      .updateAsignaturaSemestre(this.asignturaSemestre)
      .subscribe(
        (resp: any) => {
          console.log('Esta es la respuesta ', resp);
          this.listAsginaturaSemestre();
          Swal.fire(
            'Actualizado',
            'Se actualizo la asignacion de la asignatura en los semestres ',
            'success'
          );
        },
        (err) => {
          console.log('Este estes es el error ', err);
          Swal.fire('Error', 'Ocurrio un error', 'error');
        }
      );
  }
}
