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
  email;
  address:'';
  contact:'';
  username;
  jt:'';
  jd:'';


  usersRef: AngularFireList<any>;
  myGroup3: FormGroup;
  users: Observable<any[]>;
  currentUserKey;
  currentUser;
  
  addjob= {key:'',jt:'', jd:''}
  editPro = {key:'',username:'', cname:'',email:'',address:'',contact:'', accountType:''}
  editMode = false;

  constructor(private sb3: FormBuilder, private router: Router,private af: AngularFireAuth, private db: AngularFireDatabase, public authService: AuthService) {

    this.myGroup3 = sb3.group({
      'username': [null, Validators.compose([Validators.required])],
      'cname': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'contact':[null, Validators.compose([Validators.required])],
      'jt': [null, Validators.compose([Validators.required])],
      'jd':[null, Validators.compose([Validators.required])]
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
            this.username = this.currentUser.username;
            this.email = this.currentUser.email;     
            this.cname = this.currentUser.cname || '';
            this.address = this.currentUser.address || '';
            this.contact = this.currentUser.contact || '';
           
          });
        }
      });
   }
  
  ngOnInit() {
    
  }
  
  editProfile(currentUser) {
    this.editMode = true;
    this.editPro = { key: this.currentUser.key, username: this.currentUser.username, email: this.currentUser.email, cname: this.currentUser.cname, address: this.currentUser.address, contact: this.currentUser.contact, accountType: this.currentUser.accountType };
   console.log (this.editPro); 
  }


  cancelEdit() {

    this.editMode = false;
  }

  updateEdited() {
    const editedPro = this.editPro;
    this.usersRef = this.db.list('users');
    this.usersRef.set(editedPro.key, {username: editedPro.username, email: editedPro.email, cname: editedPro.cname, address:editedPro.address, contact:editedPro.contact, accountType: this.currentUser.accountType} );
    this.editMode = false;

  }

  addJob(currentUser) {
 const added= this.addjob;
 

  }

  cancelJob() {

  }
}
