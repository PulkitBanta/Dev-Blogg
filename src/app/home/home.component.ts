import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostRequest } from '../PostRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: PostRequest[] = []

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe( res => {
      this.posts$ = res;
    },
    error => console.log(error))
  }

}
