import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>; 

  constructor(private af: AngularFireAuth,
              private db: AngularFireDatabase,
              private router:Router) {

            this.af.authState.subscribe((auth) => {
              this.authState = auth;
            });
          }

       // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.af.authState
  }

  // Returns current user UID
  currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string,  username: string, accountType: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user = {
          ...user,
          username,
          accountType,
          
        }
        this.authState = user
        this.updateUserData();
        return user;
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {

    console.warn(email, password)
    return this.af.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        
        this.authState = user;
        // this.updateUserData();
        return user;
      
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.af.auth.signOut();
    this.router.navigate(['/']);
    
  }


  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const path = `users/${this.currentUserId()}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);
    const data = {
      email: this.authState.email,
      uid: this.authState.uid,
      username: this.authState.username,
      cname: this.authState.cname,
      accountType: this.authState.accountType
    }

    userRef.update(data)
      .catch(error => console.log(error));

  }


}
