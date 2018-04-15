
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

//import { environment } from './../environments/environment.prod';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { CoverComponent } from './cover/cover.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './shared/auth.service';
import { EventsManagerService } from './shared/events-manager.service';
import { ValidationService } from './shared/validation.service';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskMainComponent } from './task-main/task-main.component';
import { PostComponent } from './post/post.component';
import { AskComponent } from './ask/ask.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { TaskComponent } from './task/task.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const rootConfig = [
  { path:'',component: HomeComponent},
  { path:'home',component: HomeComponent},
  { path:'task',component: TaskComponent},
  { path:'update-profile',component: UpdateProfileComponent},
  { path:'view-profile',component: ViewProfileComponent},
  { path:'post',component: PostComponent},
  { path:'ask',component: AskComponent},
  { path:'cover',component: CoverComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    CoverComponent,
    NotFoundComponent,
    TaskCardComponent,
    TaskListComponent,
    TaskMainComponent,
    PostComponent,
    AskComponent,
    ViewProfileComponent,
    TaskComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(rootConfig),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule
  ],
  providers: [AuthService, EventsManagerService, ValidationService, AngularFireAuth],
  bootstrap: [AppComponent],

})
export class AppModule { }
