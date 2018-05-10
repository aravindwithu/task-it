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
        if (user) {
          this._user = user;
          this._status = true;
          this.eventsManager.isLoggedIn(true);
        }else{
          this._user = null;
          this._status = false;
          this.eventsManager.isLoggedIn(false);
        }
        res(this._status);
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
    var promise = new Promise((res)=>{
      this.af.auth.signInWithEmailAndPassword(email, password).then((user)=>{
        if (user) {
          this._status = true;
          this.eventsManager.isLoggedIn(true);
        }else{
          this._status = false;
          this.eventsManager.isLoggedIn(false);
        }
        res(this._status);
      });
    });
    return promise;
  }

  loginWithGoogle() {
    var promise = new Promise((res)=>{
      this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{
        if (user) {
          this._status = true;
          this.eventsManager.isLoggedIn(true);
        }else{
          this._status = false;
          this.eventsManager.isLoggedIn(false);
        }
        res(this._status);
      });
    });
    return promise;
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
