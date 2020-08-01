import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { EditorConfig } from './editor-config';
import { PostRequest } from './PostRequest';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup

  config = EditorConfig

  private postRequest: PostRequest

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: '',
      body: ''
    })

    this.postRequest = {
      id: '',
      title: '',
      content: '',
      username: ''
    }
  }
  
  onSubmit() {
    this.postRequest.title = this.postForm.get('title').value;
    this.postRequest.content = this.postForm.get('body').value;
  }

}
