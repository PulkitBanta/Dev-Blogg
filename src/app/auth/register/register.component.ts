import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterRequest } from '../RegisterRequest';
import { AuthService } from '../auth.service';
import { FormValidationService } from '../form-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  signup = false
  bool = true
  errorText = ""
  private registerRequest: RegisterRequest;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private fvService: FormValidationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.required]
    });

    this.registerRequest = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

  }

  onSubmit() {

    if (this.fvService.validateEmail(this.registerForm.get('email').value) && this.fvService.validatePassword(this.registerForm.get('password').value) && (this.registerForm.value.password === this.registerForm.value.confirmPassword) && this.registerForm.value.terms) {

      this.registerRequest.username = this.registerForm.get('username').value;
      this.registerRequest.email = this.registerForm.get('email').value;
      this.registerRequest.password = this.registerForm.get('password').value;
      this.registerRequest.confirmPassword = this.registerForm.get('confirmPassword').value;

      this.authService.register(this.registerRequest).subscribe(res => {
        this.registerSuccessful()
      }, error => {
        this.registerUnsuccessful()
        console.log(error);
      }
      )
    } else {
      this.registerUnsuccessful();
    }
  }

  registerUnsuccessful() {
    this.bool = false
    this.signup = false
  }

  registerSuccessful() {
    this.bool = true
    this.signup = true
  }

}

