import { RouterModule } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const rootConfig = [
    { path:'',component: CoverComponent },
    { path:'home',component: HomeComponent },
    { path: '**', component: NotFoundComponent }
  ];

  export const childConfig = [];
