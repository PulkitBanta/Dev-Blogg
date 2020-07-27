import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup
  signup = false
  bool = true
  errorText = ""

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.value.username && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.confirmPassword && (this.signupForm.value.password === this.signupForm.value.confirmPassword) && this.signupForm.value.terms) {
      this.signup = true
      this.bool = true
    } else {
      this.bool = false
      this.signup = false
    }
  }

}
