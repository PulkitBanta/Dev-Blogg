import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorConfig } from '../create-post/editor-config';
import { PostRequest } from '../PostRequest';
import { Observable, Subscription } from 'rxjs';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: '',
      body: '',
      tag: ''
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

    if (this.updatedRequest.title != null && this.updatedRequest.content != null) {
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
    this.updateSub.unsubscribe();
  }

}
