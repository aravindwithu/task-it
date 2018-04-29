import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  private _authStatus:boolean=false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      console.log('User loggedIn status: ',res);
    });
  }
}
