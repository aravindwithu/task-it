import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { EventsManagerService } from '../shared/events-manager.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {MatCardModule} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private eventsManager:EventsManagerService,
    private router:Router
  ) { 

  }

  ngOnInit() {
    this.eventsManager.isLoggedInEmitter.subscribe((ifLoggedIn)=>{
      this.isLoggedIn = ifLoggedIn;
    });
    
  }

  logout(){
    this.auth.signout().then(()=>{
      this.router.navigate(['/cover']);
    });
  }

}
