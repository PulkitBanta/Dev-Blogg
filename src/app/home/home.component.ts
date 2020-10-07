import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../post.service';
import { PostRequest } from '../PostRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts$: PostRequest[] = []

  sub: Subscription

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.sub = this.postService.getPosts().subscribe( res => {
      this.posts$ = res;
    },
    error => console.log(error))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
