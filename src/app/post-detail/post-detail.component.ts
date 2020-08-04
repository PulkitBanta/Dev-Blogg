import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../create-post/PostRequest';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post$: PostRequest

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPost();

    this.post$ = {
      username: '',
      title: '',
      id: '',
      content: ''
    }
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.postService.getPost(id)
      .subscribe( res => {
        this.post$ = res
      }, error => console.log(error))
  }

}
