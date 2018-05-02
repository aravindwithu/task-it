import { Component, OnInit, Input } from '@angular/core';
import {MatCard, MatButton} from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    private router:Router
  ) {

  }

  ngOnInit() {
    if(this.data){
      this.set_img(this.data.created_by)
    }
  }

  get data(){
    return this._data;
  }

  set data(dataIn){
    this._data = dataIn;
  }

  set_img(email){
    // create a reference to the storage bucket location
    console.log('email: ', email);
    let ref = this.afStorage.ref(email);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.getDownloadURL().toPromise().then((imgURL)=>{
      console.log(imgURL);
      this.profile_pic = imgURL;
      //return data;
    }).catch((error)=>{
      console.log(error);
      //return null;
    });
  }

  get_img(){
    return this.profile_pic;
  }

  routeTask(){
    console.log("routing to tasks - ", this.data.time_stamp);
    this.router.navigate(['task', this.data.time_stamp]);
  }

}
