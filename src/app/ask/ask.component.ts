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
    let timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    let profilesRef = this.db.collection("tasks").doc(timeStampInMs.toString());
    let now = new Date();
    let task_data = {
      category: post.category,
      to_email: post.post_to,
      subject: post.subject,
      description: post.description,
      status: 'assigned',
      created_by: this.auth.user.email,
      created_on: now.toDateString(),
      time_stamp: timeStampInMs,
      update_date: now.toDateString(),
      update_by: this.auth.user.email
    }
    profilesRef.set(task_data).then(()=>{
      // this.smtp.send_email();
      this.router.navigate(['/home']);
    });
  }
}
