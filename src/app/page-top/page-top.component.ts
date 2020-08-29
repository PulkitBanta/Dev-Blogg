import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pageTop() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

}
