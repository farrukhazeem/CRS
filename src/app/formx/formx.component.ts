import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formx',
  templateUrl: './formx.component.html',
  styleUrls: ['./formx.component.css']
})
export class FormxComponent implements OnInit {
  isLoginShown = true;
  
  myForm: FormGroup;
  email:'';
  username:'';
  password:'';
  constructor(private fb: FormBuilder, private router: Router) { 

    this.myForm = fb.group({
      'email': ['admin@gmail.com'],
      'username':['admin'],
      'password': ['abc']
    });

  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    this.email= value.email;
    this.username= value.username;
    this.password= value.password;

    if(this.email && this.password) {
      this.router.navigateByUrl('/admin');
    }
  }

}
