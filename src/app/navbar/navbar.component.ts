
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormxComponent } from '../formx/formx.component';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  SignOuthideMode = false;


  authState: any = null;
  users: Observable<any[]>;

  isShownLogout: boolean;
  constructor(private router: Router, public authService: AuthService, private af: AngularFireAuth,
    private db: AngularFireDatabase, ) {
  }

  ngOnInit() {

  }

  signOut() {
    this.authService.signOut();
  }


  // ngOnChanges() {
  //   console.log(this.router.url);
  //   if(this.router.url === '/' || this.router.url === '/signup'){
  //     this.isShownLogout=true;
  //   }
  //   this.isShownLogout=false;
  // }



}
