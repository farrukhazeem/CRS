
import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-formx',
  templateUrl: './formx.component.html',
  styleUrls: ['./formx.component.css']
})
export class FormxComponent implements OnInit {

  usersRef: AngularFireList<any>;
  myForm: FormGroup;
  users: Observable<any[]>;
  
  email:'';
  username:'';
  password:'';
  currentUser;

  constructor(private fb: FormBuilder, private router: Router, private db: AngularFireDatabase, public authService: AuthService){ 

  this.usersRef = db.list('users');

    this.myForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'username':[null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      
    });

    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }

  ngOnInit() {
  }

  getUserData(key) {
    this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
    return new Promise((resolve, reject) => {
      this.users.subscribe(users => {
        this.currentUser = users.find((user) => user.key === key);
        resolve(this.currentUser);
      });
    })
  }

  onSubmit(value: any) {
    
    this.authService.emailLogin(value.email, value.password).then((data) => {
      if (data) {
        const uid = data.uid;
        this.getUserData(uid).then((usd) => {
          switch(this.currentUser.accountType) {
            case 'company':
              this.router.navigateByUrl('/company');
              break;
            case 'student':
              this.router.navigateByUrl('/student');
              break;
            default:
              this.router.navigateByUrl('/admin');
              break;
          }
        })
      }

    })
      .catch(error => console.log(error));

  }

}
