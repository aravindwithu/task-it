import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { EventsManagerService } from '../shared/events-manager.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import {MatCardModule} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  profile_pic = null;

  constructor(
    private auth: AuthService,
    private afStorage: AngularFireStorage,
    private eventsManager:EventsManagerService,
    private router:Router
  ) { 

  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      this.eventsManager.isLoggedInEmitter.subscribe((ifLoggedIn)=>{
        this.isLoggedIn = ifLoggedIn;
      });
      this.profile_pic = '../assets/user-default.png';
      if(res){
        this.set_img(this.auth.user.email);
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  logout(){
    this.auth.signout().then(()=>{
      this.router.navigate(['/cover']);
    });
  }

  get_img(){
    return this.profile_pic;
  }

  set_img(email){
    // create a reference to the storage bucket location
    let ref = this.afStorage.ref('profiles/'+email);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.getDownloadURL().toPromise().then((imgURL)=>{
      this.profile_pic = imgURL;
      //return data;
    }).catch((error)=>{
      console.log(error);
      //return null;
    });
  }

}
