import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environments/environment.prod';
//import { environment } from '../../environments/environment';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  time_stamp;

  updateForm:FormGroup = new FormGroup({
    category:new FormControl(),
    post_to:new FormControl(),
    subject:new FormControl(),
    description:new FormControl(),
    status:new FormControl()
  });

  constructor(
    private fb:FormBuilder, 
    private db: AngularFirestore,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router:Router
  ) { 
    this.updateForm = fb.group({
      subject : [null, Validators.required],
      description : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        this.route.paramMap.subscribe(params => {
          this.time_stamp = parseFloat(params.get('time_stamp'));
        });
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  setUpdate(post){
    console.log('in update tasks');
    let now = new Date();
    let tasksRef = this.db.collection('tasks').doc(this.time_stamp.toString());

    let task_data = {
      subject: post.subject,
      description: post.description,
      update_date: now.toDateString(),
      update_by: this.auth.user.email
    }

    tasksRef.update(task_data).then(()=>{
      this.router.navigate(['/home']);
    });

  }
  
}

