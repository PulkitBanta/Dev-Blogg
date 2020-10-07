import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterRequest } from '../RegisterRequest';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/scroll.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  sub: Subscription

  registerForm: FormGroup
  signup = false
  bool = true
  private registerRequest: RegisterRequest;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private srollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [true]
    });

    this.registerRequest = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

  }

  onSubmit() {
      if(this.registerForm.valid) {
        this.registerRequest.username = this.registerForm.get('username').value;
        this.registerRequest.email = this.registerForm.get('email').value;
        this.registerRequest.password = this.registerForm.get('password').value;
        this.registerRequest.confirmPassword = this.registerForm.get('confirmPassword').value;
  
        this.sub = this.authService.register(this.registerRequest).subscribe(res => {
          this.registerSuccessful()
        }, error => {
          this.registerUnsuccessful()
          console.log(error);
        })
      } else {
        this.registerUnsuccessful();
      }

      this.srollService.scrollTop();
  }

  registerUnsuccessful() {
    this.bool = false
    this.signup = false
  }

  registerSuccessful() {
    this.bool = true
    this.signup = true
  }

  ngOnDestroy():void {
    if(this.sub !== undefined)
      this.sub.unsubscribe();
  }

}

