import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostRequest } from '../PostRequest';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts$: PostRequest[] = []
  faTrash = faTrash;

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

}