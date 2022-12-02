import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import decode from 'jwt-decode';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../core/models/Usuario';
import { Alumno } from '../../../../core/models/Alumno';

@Component({
  selector: 'app-list-asignaturas',
  templateUrl: './list-asignaturas.component.html',
  styleUrls: ['./list-asignaturas.component.css'],
})
export class ListAsignaturasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource: any;

  totalNumberPages: any;

  listAsignaturas: any;

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // this.listAsignturas()
    this.obtenerAsignturas();
  }
  // listAsignturas(){
  //   console.log('Hola mundo');

  //   this.alumnoService.emitirAsignaturas.subscribe((resp:any)=>{
  //     console.log('no se emitio');

  //     console.log('Estas son las asignaturas emitidas ', resp);

  //   })}

  obtenerAsignturas() {
    const token: any = sessionStorage.getItem('token');
    let decodeToken: any = {};
    decodeToken = decode(token);
    const emailUser = decodeToken.sub;

    this.usuarioService.obtenerUser(emailUser).subscribe(
      (usuario: Usuario) => {
        this.alumnoService.obtenerAlumno(usuario.id).subscribe(
          (alumno: Alumno) => {
            this.listAsignaturas = alumno.carrera?.asignaturas;
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
