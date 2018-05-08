import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks = null;

  constructor(
    private auth: AuthService,
    private router:Router,
    private db: AngularFirestore,
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
        this.tasks = data;
        this.getTasks2();
      }else{
        console.log("No tasks data found");
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
        this.tasks.push.apply(this.tasks,data);
      }else{
        console.log("No tasks data found");
      }
    });
  }
}
