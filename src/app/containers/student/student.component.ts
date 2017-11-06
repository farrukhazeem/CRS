import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../core/auth.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatTabsModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

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
  username:'';
  jt:'';
  jd:'';

  jobRef: AngularFireList<any>;
  jobs: Observable<any[]>;
  usersRef: AngularFireList<any>;
  myGroup2: FormGroup;
  users: Observable<any[]>;

  currentUserKey;
  currentUser;



  editPro = {key:'',username:'', fullname:'',email:'', cgpa:'',skills:'',experience:'', accountType:''}
  editMode = false;

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
            this.username = this.currentUser.username;
            this.email = this.currentUser.email;            
            this.fullname = this.currentUser.fullname || '';
            this.cgpa = this.currentUser.cgpa || '';
            this.skills = this.currentUser.skills || '';
            this.experience = this.currentUser.experience || '';
            
          });
        }
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

  applyjob() {


  }

  editProfile(currentUser) {
    this.editMode = true;
    this.editPro = { key: this.currentUser.key, username: this.currentUser.username, email: this.currentUser.email, fullname: this.currentUser.fullname, cgpa: this.currentUser.cgpa, skills: this.currentUser.skills, experience: this.currentUser.experience, accountType: this.currentUser.accountType };
  }


  cancelEdit() {

    this.editMode = false;
  }
  
  updateEdited() {
    const editedPro = this.editPro;
    this.usersRef = this.db.list('users');
    this.usersRef.update(editedPro.key, {username: editedPro.username, email: editedPro.email, fullname: editedPro.fullname, cgpa:editedPro.cgpa, skills:editedPro.skills, experience: editedPro.experience, accountType: this.currentUser.accountType} );
    this.editMode = false;

  }
  
  
  


}
