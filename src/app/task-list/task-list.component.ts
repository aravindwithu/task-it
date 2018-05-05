import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks;
  noTask:boolean = false;

  constructor
  (
    private auth: AuthService,
    private router:Router,
    private db: AngularFirestore
  ) {

   }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        this.getTasks();
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  getTasks(){
    let tasksRef = this.db.collection('tasks',(ref)=>{
      return ref
      .where('to_email', '==', this.auth.user.email)
    });
    let tasksRef$ = tasksRef.valueChanges();
    tasksRef$.subscribe((data) => {
      if(data){
        this.noTask = false;
        this.tasks = data;
        this.getTasks2();
        console.log(data);
        if(data.length == 0){
          this.noTask = true;
        }
      }else{
        this.noTask = true;
        console.log("No profile data found");
      }
    });
  }

  getTasks2(){
    let tasksRef = this.db.collection('tasks',(ref)=>{
      return ref
      .where('created_by', '==', this.auth.user.email)
    });
    let tasksRef$ = tasksRef.valueChanges();
    tasksRef$.subscribe((data) => {
      if(data){
        this.noTask = false;
        this.tasks.push.apply(this.tasks,data);
        console.log(data);
        if(data.length == 0){
          this.noTask = true;
        }
      }else{
        this.noTask = true;
        console.log("No profile data found");
      }
    });
  }

}
