import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe( res => {
      this.isLoggedIn$ = res;
    })
    console.log(this.isLoggedIn$)
  }

}
