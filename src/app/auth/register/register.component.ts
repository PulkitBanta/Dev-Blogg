import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterRequest } from '../RegisterRequest';
import { AuthService } from '../auth.service';

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
    private authService: AuthService
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

    this.registerRequest.username = this.registerForm.get('username').value;
    this.registerRequest.email = this.registerForm.get('email').value;
    this.registerRequest.password = this.registerForm.get('password').value;
    this.registerRequest.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerRequest).subscribe(res => {
      this.bool = true
      this.signup = true
    }, error => {
      this.bool = false
      this.signup = false
    }
    )
  }

}
