import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {

  constructor(
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
  }

  pageTop() {
    this.scrollService.scrollTop();
  }

}
