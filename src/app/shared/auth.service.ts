import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  private _user: firebase.User = null;
  private _status:boolean = false;
  private loggedIn = new BehaviorSubject<boolean>(false);

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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  signup(email, password){
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password){
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginWithTwitter() {
    return this.af.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  loginWithGithub() {
    return this.af.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  signout() {
    return this.af.auth.signOut();
  }

  setUserStatus(){
    if(this.user){
      console.log('user logged in as ',this.user.email);
      this._status = true;
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }else{
      console.log('user logged out');
      this._status = false;
      this.loggedIn.next(false);
      this.router.navigate(['/cover']);
    }
  }
}
