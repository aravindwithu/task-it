import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventsManagerService } from './events-manager.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  private _user: firebase.User = null;
  private _status:boolean = false;

  constructor(
    private af: AngularFireAuth, 
    private eventsManager:EventsManagerService) {
  }

  authUserState(){
    var promise = new Promise((res)=>{
      this.af.auth.onAuthStateChanged((user) => {
        let returnStr = 'init';
        if (user) {
          console.log('User logged in as ', user.email);
          this._user = user;
          this._status = true;
          this.eventsManager.isLoggedIn(true);
          returnStr = 'logged in';
        }else{
          console.log('User logged out');
          this._user = null;
          this._status = false;
          this.eventsManager.isLoggedIn(false);
          returnStr = 'logged out';
        }
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
      this.authUserState().then((res) => {
        console.log('User status ',res);
      });
    });
  }

  login(email, password){
    return this.af.auth.signInWithEmailAndPassword(email, password).then(()=>{
      this.authUserState().then((res) => {
        console.log('User status ',res);
      });
    });
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>{
      this.authUserState().then((res) => {
        console.log('User status ',res);
      });
    });
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
    return this.af.auth.signOut().then(()=>{
      this.authUserState().then((res) => {
        console.log('User status ',res);
      });
    });
  }
}
