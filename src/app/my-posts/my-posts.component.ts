import { Component, OnDestroy, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../post.service';
import { PostRequest } from '../PostRequest';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {

  posts$: PostRequest[] = []
  faTrash = faTrash;

  sub: Subscription

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.postService.getUserPosts().subscribe(res => {
      this.posts$ = res;
    }, error => console.log(error))
  }

  deletePost(id: number) {
    if(window.confirm("Are you sure, you want to delete this post?")) {
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

  editPost(id: number) {
    this.router.navigateByUrl(`/edit-post/${id}`)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}