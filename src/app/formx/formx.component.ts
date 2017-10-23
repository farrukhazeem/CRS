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
  currentUserKery;
  
  
  email:'';
  username:'';
  password:'';

  constructor(private fb: FormBuilder, private router: Router, private db: AngularFireDatabase, public authService: AuthService){ 

  this.usersRef = db.list('users');

    this.myForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'username':[null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

  }


  ngOnInit() {
  }

  onSubmit(value: any) {
    /*this.email= value.email;
    this.username= value.username;
    this.password= value.password;

    if(this.email && this.password && this.username) {
      this.router.navigateByUrl('/admin');
    }*/
    this.authService.emailLogin(value.email, value.password).then((data) => {
      if (data) {
        this.router.navigateByUrl('/admin');
      }
      
    })
    .catch(error => console.log(error));
    
  }

}
