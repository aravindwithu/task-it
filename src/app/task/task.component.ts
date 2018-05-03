import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { _MatChipListMixinBase } from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  time_stamp:number;
  _task;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private db: AngularFirestore
  ) { }

  ngOnInit() {

    this.auth.authUserState().then((res) => {
      if(res){
        this.route.paramMap.subscribe(params => {
          this.time_stamp = parseFloat(params.get('time_stamp'));
          this.getTasks();
          console.log('in task',this.task);
        });
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
      if(data){
        this._task = data;
      }else{
        console.log("No profile data found");
      }
    });
  }

  get task(){
    return this._task;
  }
}
