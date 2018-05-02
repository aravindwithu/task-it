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

  tasks;

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
        // rerout to cover login
      }
    });
  }

  getTasks(){
    let tasksRef = this.db.collection('tasks',(ref)=>{
      return ref
      .where('to_email', '==', this.auth.user.email);
    });
    let tasksRef$ = tasksRef.valueChanges();
    tasksRef$.subscribe((data) => {
      if(data){
        this.tasks = data;
        console.log(data);
      }else{
        console.log("No profile data found");
      }
    });
  }
}
