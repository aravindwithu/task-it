import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
//import { EmailAuthProvider } from '@firebase/auth-types';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth) {
    console.log(this.af.authState);
    this.user = this.af.authState;
  }

  signup(email, password){
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password){
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signout() {
    this.af.auth.signOut();
  }
}
