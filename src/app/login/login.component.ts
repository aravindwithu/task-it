import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private isTaskITLogin:boolean = false;

  constructor() { }

  ngOnInit() {
    this.isTaskITLogin = false;
    console.log("isTaskITLogin -> ", this.isTaskITLogin);
  }

  taskItLogin(){
    this.isTaskITLogin = true;
  }

  backToLogin(){
    this.isTaskITLogin = false;
  }

  getIsTaskITLogin(){
    return this.isTaskITLogin;
  }

}
