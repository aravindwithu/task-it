import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router:Router,
  ) { 
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

}
