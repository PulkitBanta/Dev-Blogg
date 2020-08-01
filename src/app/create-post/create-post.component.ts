import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { EditorConfig } from './editor-config';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup

  config = EditorConfig

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: '',
      body: ''
    })
  }

  onSubmit() {

  }

}
