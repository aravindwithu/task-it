import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router:Router
  ) {
   }

  ngOnInit() {
  }

  logout(){
    this.auth.signout().then(()=>{
      this.router.navigate(['/cover']);
    });
  }
}
