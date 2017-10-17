import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormxComponent } from './formx/formx.component';
import { TextComponent } from './text/text.component';
import { ContactformComponent } from './contactform/contactform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormxComponent,
    TextComponent,
    ContactformComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
