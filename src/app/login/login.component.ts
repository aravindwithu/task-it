import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private isTaskITLogin:boolean = false;
  private isSignUp:boolean = false;

  constructor() { }

  ngOnInit() {
    this.isTaskITLogin = false;
    console.log("isTaskITLogin -> ", this.isTaskITLogin);
    console.log("isSignUp -> ", this.isSignUp);
  }

  taskItLogin(){
    this.isSignUp = false;
    this.isTaskITLogin = true;
  }

  backToLogin(){
    this.isTaskITLogin = false;
  }

  getIsTaskITLogin(){
    return this.isTaskITLogin;
  }

  getIsSignUp(){
    return this.isSignUp;
  }

  setIsSignUp(){
    this.isSignUp = true;
  }

  resetIsSignUp(){
    this.isSignUp = false;
  }

}
