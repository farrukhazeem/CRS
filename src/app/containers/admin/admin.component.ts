import { NavbarComponent } from './../../navbar/navbar.component';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  SignOuthideMode = true;
  
  constructor(private nav: NavbarComponent, private router: Router, private db: AngularFireDatabase, public authService: AuthService) { }

  ngOnInit() {
  }

}
