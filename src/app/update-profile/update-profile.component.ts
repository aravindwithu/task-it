import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm:FormGroup = new FormGroup({
    first_name:new FormControl(),
    last_name:new FormControl(),
    phone:new FormControl(),
    address:new FormControl()
  });

  constructor(
    private fb:FormBuilder, 
    private db: AngularFirestore,
    private auth: AuthService
  ) 
  {
    this.updateProfileForm = fb.group({
      first_name : [null, Validators.required],
      last_name : [null, Validators.required],
      phone : [null, Validators.required],
      address : [null, Validators.required]
    });
    this.readProfile();
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
       
      }else{
        // rerout to cover login
      }
    });
  }

  updateProfile(post){
    let profilesRef = this.db.collection("profiles");
    profilesRef.doc(this.auth.user.email).set(post);
  }

  readProfile(){
    let profilesRef = this.db.collection("profiles").doc(this.auth.user.email);
    let profilesRef$ = profilesRef.valueChanges();
    profilesRef$.subscribe((data) => {
      if(data){
        this.updateProfileForm.setValue(data);
      }else{
        console.log("No profile data found");
      }
    });
  }

}
