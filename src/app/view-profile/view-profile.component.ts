import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  profileData=null;
  profile_pic = '../assets/user-default.png';

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private router:Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        this.get_img();
        this.readProfile();
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  get_img(){
    // create a random id
    let imgId = this.auth.user.email;
    // create a reference to the storage bucket location
    let ref = this.afStorage.ref(imgId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.getDownloadURL().toPromise().then((data)=>{
      this.profile_pic = data;
    }).catch((error)=>{
      console.log(error);
    });
  }

  readProfile(){
    let profilesRef = this.db.collection("profiles").doc(this.auth.user.email);

    let profilesRef$ = profilesRef.valueChanges();
    profilesRef$.subscribe((data) => {
      if(data){
        this.profileData = data;
      }else{
        console.log("No profile data found");
      }
    });
  }
}
