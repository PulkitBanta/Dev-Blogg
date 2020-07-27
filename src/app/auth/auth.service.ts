import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RegisterRequest } from './RegisterRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'port_address/api/auth'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.url}/signup`, registerRequest, this.httpOptions)
  }
}
