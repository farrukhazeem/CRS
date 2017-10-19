import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';

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
  constructor(private fb: FormBuilder) { 

    this.myForm = fb.group({
      'email': ['admin@gmail.com'],
      'username':['admin'],
      'password': ['abc']
    });

  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    this.email= value.emai;
    this.username= value.username;
    this.password= value.password;
  }

}
