import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { LoginRequest } from '../LoginRequest';
import { ScrollService } from 'src/app/scroll.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSub: Subscription

  loginForm: FormGroup
  bool = true
  loggedin = true
  loginRequest: LoginRequest

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required,  Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)]
    });

    this.loginRequest = {
      username: '',
      password: ''
    }
  }

  onSubmit() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.loginSub = this.authService.login(this.loginRequest).subscribe(
      res => {
        console.log(res);
        this.authService.isLoggedIn$.next(true);
        this.loginSuccessful()
        setTimeout(() => {
          this.router.navigateByUrl("/home");
        }, 500)
      },
      error => {
        this.loginUnsuccessful()
        console.log(error)
      }
    )

    this.scrollService.scrollTop();
  }

  loginSuccessful() {
    this.loggedin = false;
    this.bool = true;
  }

  loginUnsuccessful() {
    this.loggedin = true;
    this.bool = false;
  }

  ngOnDestroy(): void {
    if(this.loginSub !== undefined)
      this.loginSub.unsubscribe();
  }

}
