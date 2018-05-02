import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm:FormGroup = new FormGroup({
    category:new FormControl(),
    post_to:new FormControl(),
    subject:new FormControl(),
    description:new FormControl(),
    status:new FormControl()
  });

  constructor(
    private fb:FormBuilder, 
    private db: AngularFirestore,
    private auth: AuthService
  ) { 
    this.postForm = fb.group({
      category: ["(S) Self", Validators.required],
      post_to : [null, Validators.required],
      subject : [null, Validators.required],
      description : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
       
      }else{
        // rerout to cover login
      }
    });
  }

  setPost(post){
    let profilesRef = this.db.collection("tasks");
    let timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

    console.log(timeStampInMs, Date.now());
    let task_data = {
      category: post.category,
      to_email: post.post_to,
      subject: post.subject,
      description: post.description,
      status: 'assigned',
      created_by: this.auth.user.email,
      created_on: Date.now(),
      time_stamp: timeStampInMs,
      update_date: Date.now(),
      update_by: this.auth.user.email
    }
    profilesRef.add(task_data);
    console.log(post);
  }

}
