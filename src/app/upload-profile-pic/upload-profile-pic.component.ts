import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.scss']
})
export class UploadProfilePicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  browse(){
    alert("browse clicked");
  }

}
