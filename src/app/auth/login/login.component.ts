import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../LoginRequest';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required]
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
        this.loginSuccessful()
        this.authService.authenticate();
        setTimeout(() => {
          this.router.navigateByUrl("/home");
        }, 500)
      },
      error => {
        this.loginUnsuccessful()
        console.log(error)
      }
    )
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
