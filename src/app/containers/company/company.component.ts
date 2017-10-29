import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatTabsModule} from '@angular/material';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  cname:'';
  company_email;
  address:'';
  contact:'';
  company_username;

  usersRef: AngularFireList<any>;
  myGroup3: FormGroup;
  users: Observable<any[]>;
  currentUserKey;
  currentUser;
  

  constructor(private sb3: FormBuilder, private router: Router,private af: AngularFireAuth, private db: AngularFireDatabase, public authService: AuthService) {

    this.myGroup3 = sb3.group({
      'company_username': [null, Validators.compose([Validators.required])],
      'cname': [null, Validators.compose([Validators.required])],
      'company_email': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'contact':[null, Validators.compose([Validators.required])]
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
            this.company_username = this.currentUser.username;
            this.company_email = this.currentUser.email;     
            this.cname = this.currentUser.cname || '';
            this.address = this.currentUser.address || '';
            this.contact = this.currentUser.contact || '';
           
          });
        }
      });
   }
  
  ngOnInit() {
    
  }
  onSubmit(value: any): void {
    if (value.company_username && value.company_email && value.cname && value.address && value.contact ) {
      this.usersRef.update(this.currentUser.key, { username: value.company_username, email: value.company_email, cname: value.cname, address: value.address, contact: value.contact });
    }

  }
}
