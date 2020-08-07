import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    if(window.confirm("Do you want to logout ?")) {
      
      this.authService.logout();
      
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 500);
    }
  }

}
