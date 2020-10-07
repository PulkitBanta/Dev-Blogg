import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn$ : boolean;

  logoUrl="../../assets/logo.svg"

  constructor(
    public authService: AuthService,
    private router: Router,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.changeTheme('light');

    // subscribing to user's login
    this.authService.isLoggedIn$.subscribe(res => {
      this.loggedIn$ = res;
    })
  }

  logout() {
    if(window.confirm("Do you want to logout ?")) {
      
      this.authService.logout();
      
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 500);
    }
  }

  changeTheme(val: string): void {
    if(val === 'light') {
      this.renderer2.addClass(document.body, 'light');
      this.renderer2.removeClass(document.body, 'dark');
      this.renderer2.removeClass(document.body, 'reading');
      this.logoUrl = "../../assets/logo.svg";
    } else if (val === 'dark') {
      this.renderer2.addClass(document.body, 'dark');
      this.renderer2.removeClass(document.body, 'light');
      this.renderer2.removeClass(document.body, 'reading');
      this.logoUrl = "../../assets/light_logo.svg";
    } else {
      this.renderer2.addClass(document.body, 'reading');
      this.renderer2.removeClass(document.body, 'dark');
      this.renderer2.removeClass(document.body, 'light');
      this.logoUrl = "../../assets/logo.svg";
    }
  }

}
