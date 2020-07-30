import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RegisterRequest } from './RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from './LoginRequest';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'port_address/api/auth/'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.url}signup`, registerRequest, this.httpOptions)
  }

  login(loginRequest: LoginRequest): Observable<Boolean> {
    return this.http.post(`${this.url}login`, loginRequest, {responseType: 'text'}).pipe(map( data => {
      this.localStorageService.store('authenticationToken', data)
      console.log(data)
      return true;
    }))
  }
}
