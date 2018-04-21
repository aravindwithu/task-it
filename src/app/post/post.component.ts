import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { 
    this.postForm = fb.group({
      'category': [null, Validators.required],
      'post_to' : [null, Validators.required],
      'subject' : [null, Validators.required],
      'discription' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  getPost(post){

  }

}
