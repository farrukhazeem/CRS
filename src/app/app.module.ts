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
    SignupComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
      }


    ])
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
