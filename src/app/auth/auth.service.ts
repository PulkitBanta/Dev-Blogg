import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable,  } from 'rxjs';
import { map } from 'rxjs/operators'
// import localStorage } from 'ngx-webstorage';

import { LoginRequest } from './LoginRequest';
import { RegisterRequest } from './RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private url = 'port_address/api/auth/'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    // localStorage
  ) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.url}signup`, registerRequest, this.httpOptions)
  }

  login(loginRequest: LoginRequest): Observable<Boolean> {
    return this.http.post(`${this.url}login`, loginRequest, {responseType: 'text'}).pipe(map( data => {
      console.log(data)
      localStorage.clear();
      // localStorage.clear('authenticationToken');
      localStorage.setItem('username', loginRequest.username);
      localStorage.setItem('authenticationToken', data)
      return true;
    }))
  }

  logout() {
    // clear the local storage in the browser
    localStorage.clear();
    // localStorage.clear('username');
    this.isLoggedIn$.next(false);
  }

  authenticate() {
    if(localStorage.getItem('authenticationToken') != null) {
      this.isLoggedIn$.next(true);
    }
  }

  autoLogin() {
    if(localStorage.getItem('authenticationToken') && localStorage.getItem('username')) {
      this.isLoggedIn$.next(true);
    }
  }

}
