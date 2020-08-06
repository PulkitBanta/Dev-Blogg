import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../LoginRequest';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  bool = true
  loggedin = true
  loginRequest: LoginRequest

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private fvService: FormValidationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginRequest = {
      username: '',
      password: ''
    }
  }

  onSubmit() {
    if (this.fvService.validateEmail(this.loginForm.get('email').value) && this.fvService.validatePassword(this.loginForm.get('password').value)) {
      this.loginRequest.username = this.loginForm.get('username').value;
      this.loginRequest.password = this.loginForm.get('password').value;

      this.authService.login(this.loginRequest).subscribe(
        res => {
          console.log(res);
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
    } else {
      this.loginUnsuccessful();
    }
  }

  loginSuccessful() {
    this.loggedin = false;
    this.bool = true;
  }

  loginUnsuccessful() {
    this.loggedin = true;
    this.bool = false;
  }

}
