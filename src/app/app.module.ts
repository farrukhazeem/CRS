import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormxComponent } from './formx/formx.component';
import { TextComponent } from './text/text.component';
import { ContactformComponent } from './contactform/contactform.component';
import { HomeComponent } from './home/home.component';
import { PostedjobComponent } from './postedjob/postedjob.component';
import { NewjobComponent } from './newjob/newjob.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AdminComponent } from './containers/admin/admin.component';
import { CompanyComponent } from './containers/company/company.component';
import { StudentComponent } from './containers/student/student.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatCardModule,
  MatSidenavModule} from '@angular/material';

export const firebaseConfig = {
  apiKey: "AIzaSyDfgQh8VhYS7NBdARyRC3iMQ3jfPCr3Zo0",
  authDomain: "crsystem-a382f.firebaseapp.com",
  databaseURL: "https://crsystem-a382f.firebaseio.com",
  projectId: "crsystem-a382f",
  storageBucket: "crsystem-a382f.appspot.com",
  messagingSenderId: "455824595324"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormxComponent,
    TextComponent,
    ContactformComponent,
    
    HomeComponent,
    PostedjobComponent,
    NewjobComponent,
    AboutusComponent,
    SignupComponent,
    AdminComponent,
    CompanyComponent,
    StudentComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
    RouterModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component:FormxComponent
      },
      {
        path: 'signup',
        component:SignupComponent
      },
      {
        path: 'home',
        component:HomeComponent
      },
      {
        path: 'postedjob',
        component: PostedjobComponent 
          
      },
      {
        path: 'newjob',
        component: NewjobComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      }
     

    ]),
    AngularFireModule.initializeApp(firebaseConfig)
    
 ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
