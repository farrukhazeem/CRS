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
  currentUserKery;

  email:'';
  username:'';
  password:'';

  constructor(private sb: FormBuilder, private router: Router, private db: AngularFireDatabase, public authService: AuthService){ 
    this.usersRef = db.list('users');
    
    this.myGroup = sb.group({
      'email': [null, Validators.compose([Validators.required])],
      'username':[null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }


  ngOnInit() {
  }
  onSubmit(value: any)  {
    console.log("Are you here?");
    }


}
