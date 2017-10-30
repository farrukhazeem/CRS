import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../core/auth.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatTabsModule} from '@angular/material';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent  {
  fullname:'';
  cgpa:'';
  skills:'';
  experience:'';
  email:'';
  company_username:'';

  usersRef: AngularFireList<any>;
  myGroup2: FormGroup;
  users: Observable<any[]>;
  currentUserKey;
  currentUser;



  constructor(private sb2: FormBuilder,private router: Router, private db: AngularFireDatabase, public authService: AuthService,  private af: AngularFireAuth,) {
    this.myGroup2 = sb2.group({
      'username': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'fullname': [null, Validators.compose([Validators.required])],
      'cgpa': [null, Validators.compose([Validators.required])],
      'skills': [null, Validators.compose([Validators.required])],
      'experience':[null, Validators.compose([Validators.required])]
    });
    this.usersRef = db.list('users');

    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.users.subscribe(users => {
            this.currentUser = users.find((user) => user.key === auth.uid);
            this.company_username = this.currentUser.company_username;
            this.email = this.currentUser.email;            
            this.fullname = this.currentUser.fullname || '';
            this.cgpa = this.currentUser.cgpa || '';
            this.skills = this.currentUser.skills || '';
            this.experience = this.currentUser.experience || '';
            
          });
        }
      });

   }

  ngOnInit() {

  }
  onSubmit(value: any): void {
    if (value.company_username && value.email && value.fullname && value.cgpa && value.skills && value.experience) {

      this.usersRef = this.db.list('users');
      this.usersRef.update(this.currentUser.key, { company_username: value.company_username, email: value.email, fullname: value.fullname, cgpa: value.cgpa, skills: value.skills, experience: value.experience });
    }

  }


}
