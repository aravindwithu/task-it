import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.scss']
})
export class UploadProfilePicComponent implements OnInit {

  img_file;
  img_name = '';
  profile_pic = '../assets/user-default.png';


  constructor(
    private auth: AuthService,
    private afStorage: AngularFireStorage
  ) {
    
   }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        this.get_img();
      }else{
        // rerout to cover login
      }
    });
  }

  read_img(file){
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profile_pic = event.target.result;
    }
    reader.readAsDataURL(file);
  }

  browse(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      this.img_name = event.target.files[0].name;
      this.img_file = event.target.files[0];
      this.read_img(event.target.files[0]);
    }
  }

  upload(){
    // create a random id
    let imgId = this.auth.user.email;
    // create a reference to the storage bucket location
    let ref = this.afStorage.ref(imgId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    let task = ref.put(this.img_file); 
    alert("image uploaded successfully");
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
}