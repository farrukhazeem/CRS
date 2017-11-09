import { NavbarComponent } from './../../navbar/navbar.component';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { MatButtonModule,MatListModule } from '@angular/material';

import { Observable } from 'rxjs';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  companys: Observable<any[]>;

  currentUserKey;
  currentUser;
  viewMode = false;
  compviewMode =false;
  jobview = false;

  viewstd = {key:'',username:'', fullname:'',email:'', cgpa:'',skills:'',experience:''}
  viewcomp= { key: '', username: '', cname: '', email: '', address: '', contact: ''}
  viewjob=  {key: '', jt: '', jd: '',cname: '', email: '' }
  
  constructor(private sb3: FormBuilder, private router: Router, private af: AngularFireAuth, private db: AngularFireDatabase, public authService: AuthService) {


    this.myGroup3 = sb3.group({
      'username': [null, Validators.compose([Validators.required])],
      'cname': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'contact': [null, Validators.compose([Validators.required])],
      'jt': [null, Validators.compose([Validators.required])],
      'jd': [null, Validators.compose([Validators.required])]
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
  viewstdDetail(student) {
    this.viewMode = true;
 console.log (student);
 this.viewstd = { key: student.key, username: student.username, email: student.email, fullname: student.fullname, cgpa: student.cgpa, skills: student.skills, experience: student.experience};
 console.log (this.viewstd);
  }
  viewComDetail(company) {
    this.compviewMode = true;
    console.log(company);
    this.viewcomp= { key: company.key, username: company.username, cname: company.cname, email: company.email, address: company.address, contact:company.contact};
  }

 viewjobDetail(job) {
 this.jobview = true;
 console.log(job);
 this.viewjob= {key: job.key, jt: job.jt, jd: job.jd,cname: job.cname, email: job.email }
}

ok(){
  this.viewMode = false;
}

okjob(){
  this.jobview = false;
}
okcmp(){
  this.compviewMode =false;

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
