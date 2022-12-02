import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private readonly urlBase = environment.api

  public login(user:any){
   return this.http.post(`${this.urlBase}/auth/iniciarSesion`,user)
  }
  
}
