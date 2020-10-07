import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs';

import { EditorConfig } from './editor-config';
import { PostRequest } from '../PostRequest';
import { PostService } from '../post.service';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  sub: Subscription

  postForm: FormGroup
  post: Boolean = true
  error: Boolean = true;

  config = EditorConfig

  private postRequest: PostRequest

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(20)]],
      tag: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(200)]]
    })

    this.postRequest = {
      id: '',
      tag: '',
      title: '',
      content: '',
      username: '',
      createdOn: '',
      updatedOn: ''
    }
  }

  onSubmit() {

    if(this.postForm.valid) {
      // getting values and adding it to post request
      this.postRequest.title = this.postForm.get('title').value;
      this.postRequest.tag = this.postForm.get('tag').value;
      this.postRequest.content = this.postForm.get('body').value;

      this.sub = this.postService.addPost(this.postRequest).subscribe( data => {
        this.postSuccessful();
        setTimeout(() => {
          this.router.navigateByUrl('/home')
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
    if ((this.postForm.get('title').dirty || this.postForm.get('body').dirty || this.postForm.get('tag').dirty) && this.post) {
      return confirm('Do you want to discard the changes?');
    } else return true;
  }

  ngOnDestroy(): void {
    if(this.sub !== undefined)
      this.sub.unsubscribe();
  }

}
