import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostRequest } from '../create-post/PostRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts$: PostRequest[] = []

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postService.getUserPosts().subscribe(res => {
      this.posts$ = res;
    }, error => console.log(error))
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(res => {
      console.log(res)
      setTimeout(() => {
        this.router.navigateByUrl("/home")
      }, 500);
    }, error => {
      console.log(error);
    })
  }

}