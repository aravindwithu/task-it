import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) 
  {
    this.updateProfileForm = fb.group({
      'email': [null, Validators.required],
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'address' : [null, Validators.required]
      // 'street' : [null, Validators.required],
      // 'city' : [null, Validators.required],
      // 'state' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  updateProfile(post){

  }

}
