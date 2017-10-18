import { Component, OnInit } from '@angular/core';
import { FormxComponent } from '../formx/formx.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginUser(event) {
    const loginAs = event.target.getAttribute("data-login-as");
    console.log(loginAs);


  }

}
