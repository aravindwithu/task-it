import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ValidationService } from '../shared/validation.service';
import { environment } from '../../environments/environment.prod';
// import { environment } from '../../environments/environment';

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    category: new FormControl(),
    post_to: new FormControl(),
    subject: new FormControl(),
    description: new FormControl(),
    status: new FormControl()
  });

  constructor(
    private fb:FormBuilder, 
    private db: AngularFirestore,
    private auth: AuthService,
    private router:Router,
    private validation: ValidationService
    // private smtp:SmtpService
  ) { 
    this.postForm = fb.group({
      category: ["(S) Self", Validators.required],
      post_to : [null, Validators.compose([Validators.required, Validators.pattern(validation.getEmailPattern())])],
      subject : [null, Validators.required],
      description : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        // donothing
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  setPost(post){
    let timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    let tasksRef = this.db.collection("tasks").doc(timeStampInMs.toString());
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
    tasksRef.set(task_data).then(()=>{
      // this.smtp.send_email();
      this.router.navigate(['/home']);
    });
  }

}
