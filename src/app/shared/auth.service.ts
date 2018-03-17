import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
//import { EmailAuthProvider } from '@firebase/auth-types';

@Injectable()
export class AuthService {
  private user: firebase.User = null;
  private state: boolean = false;

  constructor(public afAuth: AngularFireAuth) {
    console.log("in auth");
    this.authUser();
  }
  
  authUser(){
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user);
    });
  }

  setUser(user){
    if (user) {
      this.state = true;
      this.user = user;
    } else {
      this.state = false;
      this.user = null;
    }
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
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.setUser(user);
      console.log('Login Sucessfull');
      console.log('state',this.state);
      console.log('user',this.user);
      return user;
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log( error.code + " - " + error.message);
      return error;
    });
  }

  login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.setUser(user);
      console.log('Login Sucessfull');
      console.log('state',this.state);
      console.log('user',this.user);
      return user;
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log( error.code + " - " + error.message);
      return error;
    });
  }
}
