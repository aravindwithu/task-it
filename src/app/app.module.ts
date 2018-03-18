
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


//import { environment } from './../environments/environment.prod';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { rootConfig } from './app.router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { CoverComponent } from './cover/cover.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './shared/auth.service';
import { ValidationService } from './shared/validation.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    CoverComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot(rootConfig)
  ],
  providers: [AuthService, ValidationService, AngularFireAuth],
  bootstrap: [AppComponent],

})
export class AppModule { }
