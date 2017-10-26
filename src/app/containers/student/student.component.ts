import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { NavbarComponent } from './../../navbar/navbar.component';
import { AuthService } from './../../core/auth.service';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private nav: NavbarComponent, private router: Router, private db: AngularFireDatabase, public authService: AuthService) { }

  ngOnInit() {
  }

}
