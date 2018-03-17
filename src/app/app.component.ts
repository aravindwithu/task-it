import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  authState:boolean = false;

  constructor(private auth: AuthService
   ) { }
  
  ngOnInit() {
    this.authState = this.auth.getState();
    console.log(this.authState);
    console.log(this.auth.getUser());
  }

}
