import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) {
   }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      console.log('User status ',res);
    });
  }
}
