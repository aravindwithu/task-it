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
  _task;

  updateForm:FormGroup = new FormGroup({
    subject:new FormControl(),
    description:new FormControl()
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
        this.getTasks();
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  getTasks(){
    let tasksRef = this.db.collection('tasks',(ref)=>{
      return ref
      .where('time_stamp', '==', this.time_stamp);
    });
    let tasksRef$ = tasksRef.valueChanges();
    tasksRef$.subscribe((data) => {
      if(data && data[0]){
        console.log(data);
        this.updateForm.setValue({
          subject: data[0]['subject'],
          description:  data[0]['description']
        });
      }else{
        console.log("No profile data found");
      }
    });
  }

  get task(){
    return this._task;
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
      this.router.navigate(['task', this.time_stamp]);
    });

  }
  
}

