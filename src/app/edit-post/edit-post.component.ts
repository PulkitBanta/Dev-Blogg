import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostRequest } from '../create-post/PostRequest';
import { EditorConfig } from '../create-post/editor-config';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  updateForm: FormGroup
  post: Boolean = true
  error: Boolean = true;

  postId: number;

  config = EditorConfig

  editorData: string
  postTitle: string

  private postRequest: PostRequest

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: '',
      body: ''
    })

    this.postRequest = {
      id: '',
      title: '',
      content: '',
      username: '',
      createdOn: '',
      updatedOn: ''
    }

    this.postId = +this.route.snapshot.paramMap.get('id')
    this.getPostContent(this.postId);
  }

  getPostContent(id: number) {
    this.postService.getPost(id).subscribe(res => {
      this.editorData = res.content;
      this.postTitle = res.title;
      this.postRequest.id += id;
    })
  }

  onSubmit() {
    this.postRequest.title = this.postTitle;
    this.postRequest.content = this.updateForm.get('body').value;

    console.log(this.postRequest)

    if(this.postRequest.title != null && this.postRequest.content != null) {
      this.postService.addPost(this.postRequest).subscribe( data => {
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

}
