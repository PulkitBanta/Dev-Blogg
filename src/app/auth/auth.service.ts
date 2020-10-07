import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-webstorage';

import { LoginRequest } from './LoginRequest';
import { RegisterRequest } from './RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new Subject<boolean>();

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
      console.log(data)
      this.localStorageService.clear('username');
      this.localStorageService.clear('authenticationToken');
      this.localStorageService.store('username', loginRequest.username);
      this.localStorageService.store('authenticationToken', data)
      return true;
    }))
  }

  logout() {
    // clear the local storage in the browser
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.isLoggedIn$.next(false);
  }

  authenticate() {
    if(this.localStorageService.retrieve('authenticationToken') != null) {
      this.isLoggedIn$.next(true);
    }
  }

}
