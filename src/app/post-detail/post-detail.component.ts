import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostRequest } from '../PostRequest';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post$: PostRequest

  sub: Subscription

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPost();

    this.post$ = {
      id: '',
      tag: '',
      title: '',
      content: '',
      username: '',
      createdOn: '',
      updatedOn: ''
    }
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.sub = this.postService.getPost(id).subscribe(res => {
      this.post$ = res
    }, error => console.log(error))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
