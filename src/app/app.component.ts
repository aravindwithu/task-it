import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  user:any;

  constructor(private auth: AuthService
   ) { }
  
  ngOnInit() {
    this.user = this.auth.user;
  }

}
