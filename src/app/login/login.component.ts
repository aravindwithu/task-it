import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../shared/auth.service';
import { ValidationService } from '../shared/validation.service';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private isLogin:boolean = false;
  private isSignup:boolean = false;

  loginForm:FormGroup;
  signupForm:FormGroup;
  post:any;

  constructor(
    private auth: AuthService, 
    private fb:FormBuilder,
    private validation: ValidationService,
    private router:Router) { 
    
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
    this.resetIsLogin();
    this.resetIsSignup();
  }

  getIsLogin(){
    return this.isLogin;
  }

  setIsLogin(){
    this.isLogin = true;
  }

  resetIsLogin(){
    this.isLogin = false;
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

  signupPost(post){
    this.auth.signup(post.signup_email, post.signup_password).then(()=>{
      this.router.navigate(['/view-profile']);
    });
  }

  loginPost(post){
    this.auth.login(post.login_email, post.login_password).then(()=>{
      this.router.navigate(['/home']);
    });
  }

  loginWithGoogle(){
    this.auth.loginWithGoogle().then(()=>{
      this.router.navigate(['/home']);
    });
  }

  loginWithFacebook(){
    this.auth.loginWithFacebook();
  }

  loginWithTwitter(){
    this.auth.loginWithTwitter();
  }

  loginWithGithub(){
    this.auth.loginWithGithub();
  }
}
