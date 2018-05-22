import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ValidationService } from '../shared/validation.service';

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
    private auth: AuthService,
    private validation: ValidationService
  ) { 
    this.askForm = fb.group({
      category: ["(S) Self", Validators.required],
      ask_to : [null, Validators.compose([Validators.required, Validators.pattern(validation.getEmailPattern())])],
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
    let tasksRef = this.db.collection("tasks").doc(timeStampInMs.toString());
    let now = new Date();
    let task_data = {
      category: post.category,
      to_email: post.ask_to,
      subject: post.subject,
      description: post.description,
      status: 'asked',
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
