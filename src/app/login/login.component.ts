
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../shared/auth.service';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private isTaskITLogin:boolean = false;
  private isSignup:boolean = false;

  loginForm:FormGroup;
  signupForm:FormGroup;
  post:any;
  
  constructor(
    private auth: AuthService, 
    private fb:FormBuilder,
    private validation: ValidationService) { 
    this.loginForm = fb.group({
      'login_email' : [null, Validators.compose([Validators.required, Validators.pattern(validation.getEmailPattern())])],
      'login_password' : [null, Validators.required]
    });

    this.signupForm = fb.group({
      'signup_email' : [null, Validators.compose([Validators.required, Validators.pattern(validation.getEmailPattern())])],
      'signup_password' : [null, Validators.required],
      'confirm_password' : [null, Validators.required]
    });
  }

  ngOnInit() {
    this.isTaskITLogin = false;
    console.log("isTaskITLogin -> ", this.isTaskITLogin);
    console.log("isSignUp -> ", this.isSignup);
  }

  taskItLogin(){
    this.isSignup = false;
    this.isTaskITLogin = true;
  }

  backToLogin(){
    this.isTaskITLogin = false;
  }

  getIsTaskITLogin(){
    return this.isTaskITLogin;
  }

  getIsSignup(){
    return this.isSignup;
  }

  setIsSignup(){
    this.isSignup = true;
  }

  resetIsSignup(){
    this.isSignup = false;
  }

  loginPost(post){
    let email = post.login_email;
    let password:string = post.login_password;
    console.log('email -> ',email);
    console.log('password -> ',password);
    //this.auth.login(email, password);
  }

  signupPost(post){
    let email = post.signup_email;
    let password:string = post.signup_password;
    console.log('email -> ',email);
    console.log('password -> ',password);
    //this.auth.signup(email, password);
  }
}
