import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class AuthService {
  private _user: firebase.User = null;
  private _status:boolean=false;

  constructor(private af: AngularFireAuth, private router:Router) {
  }

  authUserState(){
    var promise = new Promise((res)=>{
      this.af.auth.onAuthStateChanged((user) => {
        let returnStr = 'logged out';
        this._user = null;
        this._status = false;
        if (user) {
          this._user = user;
          this._status = true;
          returnStr = 'logged in';
        } 
        this.setUserStatus();
        res(returnStr);
      });
    });
    return promise;
  }

  get user(){
    return this._user;
  }

  get status(){
    return this._status;
  }

  signup(email, password){
    return this.af.auth.createUserWithEmailAndPassword(email, password).then(()=>{
      this. setUserStatus();
    });
  }

  login(email, password){
    return this.af.auth.signInWithEmailAndPassword(email, password).then(()=>{
      this. setUserStatus();
    });
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>{
      this. setUserStatus();
    });
  }

  loginWithFacebook() {
    return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(()=>{
      this. setUserStatus();
    });
  }

  loginWithTwitter() {
    return this.af.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(()=>{
      this. setUserStatus();
    });
  }

  loginWithGithub() {
    return this.af.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(()=>{
      this. setUserStatus();
    });
  }

  signout() {
    return this.af.auth.signOut().then(()=>{
      this. setUserStatus();
    });
  }

  setUserStatus(){
    if(this.user){
      console.log('user logged in as ',this.user.email);
      this._status = true;
      this.router.navigate(['/home']);
    }else{
      console.log('user logged out');
      this._status = false;
      this.router.navigate(['/cover']);
    }
  }
}
