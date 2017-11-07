import { NavbarComponent } from './../../navbar/navbar.component';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { Observable} from 'rxjs';

import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})




export class AdminComponent implements OnInit {


  usersRef: AngularFireList<any>;
  studentsRef: AngularFireList<any>;
  jobRef: AngularFireList<any>;
  myGroup3: FormGroup;
  users: Observable<any[]>;
  students: Observable<any[]>;
  jobs: Observable<any[]>;

  companysRef: AngularFireList<any>;
  companys:Observable<any[]>;

  currentUserKey;
  currentUser;

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



    this.studentsRef = db.list('/users',
    ref => ref.orderByChild('accountType').equalTo("student")
  );
  this.students = this.studentsRef.snapshotChanges().map(changes => {
    return changes.map(c => {
        return { key: c.payload.key, ...c.payload.val() }
    })
  });
  

  this.companysRef = db.list('/users',
  ref => ref.orderByChild('accountType').equalTo("company") 
  
);
this.companys = this.companysRef.snapshotChanges().map(changes => {
  return changes.map(c => {
      return { key: c.payload.key, ...c.payload.val() }
  })
});

this.jobRef = db.list('/jobs');

this.jobs = this.jobRef.snapshotChanges().map(changes => {
return changes.map(c => {
    return { key: c.payload.key, ...c.payload.val() }
})
});




  }

  

  ngOnInit() {
  }
  
  removeDetail(key: string) {
    this.studentsRef.remove(key);
  }

  removeCompany(key: string) {
    this.companysRef.remove(key);
  }
  removejob(key: string) {
    this.jobRef.remove(key);
  }

}
