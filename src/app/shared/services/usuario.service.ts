import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly urlBase = environment.api
  constructor(private http:HttpClient) { }

  obtenerUser(email:string):Observable<Usuario>{  
   return this.http.get<Usuario>(`${this.urlBase}/auth/actual-usuario/${email}`)   
  }

  updateUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlBase}/auth/update-user/${usuario.id}`, usuario)
  }

  updatePassword(usuario:Usuario){
    console.log('Este es el usuario ', usuario);
    
    return this.http.put(`${this.urlBase}/auth/update-password-user/${usuario.id}`, usuario)
  }
 




}
