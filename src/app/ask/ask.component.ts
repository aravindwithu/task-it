import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  askForm:FormGroup = new FormGroup({
    category:new FormControl(),
    post_to:new FormControl(),
    subject:new FormControl(),
    description:new FormControl(),
  });

  constructor(
    private fb:FormBuilder,
    private db: AngularFirestore,
    private router:Router,
    private auth: AuthService
  ) { 
    this.askForm = fb.group({
      category: ["(S) Self", Validators.required],
      ask_to : [null, Validators.required],
      subject : [null, Validators.required],
      description : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
       
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  setPost(post){
    console.log(post);
    let profilesRef = this.db.collection("tasks");
    let timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

    //console.log(timeStampInMs, Date.now());
    let task_data = {
      category: post.category,
      to_email: post.ask_to,
      subject: post.subject,
      description: post.description,
      status: 'asked',
      created_by: this.auth.user.email,
      created_on: Date.now(),
      time_stamp: timeStampInMs,
      update_date: Date.now(),
      update_by: this.auth.user.email
    }
    profilesRef.add(task_data);
  }

}
