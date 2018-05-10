import { Component, OnInit, Input } from '@angular/core';
import {MatCard, MatButton} from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() _data:any;
  profile_pic = null;
 
  constructor(
    private afStorage: AngularFireStorage,
    private router:Router,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        if(this.data){
          this.set_img(this.data.created_by)
        }
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  get data(){
    return this._data;
  }

  set data(dataIn){
    this._data = dataIn;
  }

  set_img(email){
    // create a reference to the storage bucket location
    let ref = this.afStorage.ref('profiles/'+email);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.getDownloadURL().toPromise().then((imgURL)=>{
      this.profile_pic = imgURL;
    }).catch((error)=>{
      console.log(error);
    });
  }

  get_img(){
    if(this.profile_pic){
      return this.profile_pic;
    }
    return '../assets/user-default.png';
    
    
  }

  routeTask(){
    this.router.navigate(['task', this.data.time_stamp]);
  }

}
