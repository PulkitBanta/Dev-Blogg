import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { EditorConfig } from '../create-post/editor-config';
import { PostRequest } from '../PostRequest';
import { PostService } from '../post.service';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  sub: Subscription
  updateSub: Subscription

  updateForm: FormGroup
  post: Boolean = true
  error: Boolean = true;

  config = EditorConfig

  updatedRequest: PostRequest

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(20)]],
      tag: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(200)]]
    })

    this.updatedRequest = {
      id: '',
      tag: '',
      title: '',
      content: '',
      username: '',
      createdOn: '',
      updatedOn: ''
    }

    var postId: number = +this.route.snapshot.paramMap.get('id')
    this.getPostContent(postId);
  }

  getPostContent(id: number) {
    this.sub = this.postService.getPost(id).subscribe(res => {
      this.updatedRequest = res;

      // setting values in the form
      this.updateForm.setValue({
        title: this.updatedRequest.title,
        tag: this.updatedRequest.tag,
        body: this.updatedRequest.content
      });
    })
  }

  onSubmit() {
    if (this.updateForm.get('title').dirty)
      this.updatedRequest.title = this.updateForm.get('title').value;

    if (this.updateForm.get('body').dirty)
      this.updatedRequest.content = this.updateForm.get('body').value;

    if (this.updateForm.get('tag').dirty)
      this.updatedRequest.tag = this.updateForm.get('tag').value;

    if(this.updateForm.valid && this.updateForm.dirty) {
      this.updateSub = this.postService.addPost(this.updatedRequest).subscribe(data => {
        console.log(data);
        this.postSuccessful();
        setTimeout(() => {
          this.router.navigateByUrl('/my-posts')
        }, 500)
      },
        error => {
          this.postUnsuccessful();
          console.log(error);
        });
    } else {
      this.postUnsuccessful();
    }

    this.scrollService.scrollTop();
  }

  postSuccessful() {
    this.post = false;
    this.error = true;
  }

  postUnsuccessful() {
    this.post = true;
    this.error = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.updateForm.get('title').dirty || this.updateForm.get('body').dirty || this.updateForm.get('tag').dirty && this.post) {
      return confirm('Do you want to discard the changes?');
    } else return true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

    if(this.updateSub !== undefined)
      this.updateSub.unsubscribe();
  }

}
