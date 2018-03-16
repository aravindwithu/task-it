import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: firebase.User = null;
  private state: boolean = false;

  constructor(public afAuth: AngularFireAuth) {
    console.log("in auth");
    this.setUser();
  }

  setUser(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.state = true;
        this.user = user;
      } else {
        this.state = false;
        this.user = null;
        // User is signed out.
        // ...
      }
    });
  }

  getUser() {
    return this.user;
  }

  getToken(){
    return this.user.getToken;
  }

  getState(){
    return this.state;
  }

  signup(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  signin(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
}
