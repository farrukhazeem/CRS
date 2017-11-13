import { Component, OnInit } from '@angular/core';

import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usersRef: AngularFireList<any>;
  myGroup: FormGroup;
  users: Observable<any[]>;
  currentUserKey;

  email:'';
  username:'';
  password:'';
  confirmPassword: '';
  accountType: '';

  constructor(private sb: FormBuilder, private router: Router, private db: AngularFireDatabase, public authService: AuthService){ 
    this.usersRef = db.list('users');
    
    this.myGroup = sb.group({
      'email': [null, Validators.compose([Validators.required])],
      'username':[null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'pass2': [null, Validators.compose([Validators.required])],
      'accountType': [null, Validators.compose([Validators.required])]
    });
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

  }

  

  ngOnInit() {
  }
  onSubmit(value: any): void  {
    this.authService.emailSignUp(value.email, value.password, value.username,value.accountType ).then((data) => {
      // this.router.navigateByUrl('/');
    /*if (data) {
         switch(data.accountType) {
          // case 'company':
            // this.router.navigateByUrl('/company');
            // break;
          // case 'student':
            // this.router.navigateByUrl('/student');
            // break;
          default :
             this.router.navigateByUrl('/');
             break;
         }
    }*/
  })

  }
}