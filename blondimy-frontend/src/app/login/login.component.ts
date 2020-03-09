import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { UserLogin } from '../models/UserLogin';
import { FormStyle } from '@angular/common';

export enum LoginType {
  LOGIN,
  SIGNIN
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin;
  error: any;
  mode: LoginType;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.mode = LoginType.LOGIN;
  }

  ngOnInit(): void {
    this.userLogin = {
      username: '',
      password: ''
    };
    this.error = '';
  }


  submit(): void {
    if (this.mode === LoginType.LOGIN) {
      this.login();
    }
    else if (this.mode === LoginType.SIGNIN) {
      this.signin();
    }
  }

  /**
   * Login operation by username and password recovered from userLogin model attribute
   */
  login(): void { 
    this.error = '';
    this.authService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
          res => this.router.navigate(['']),
          err => this.handleError(err),
      );
  }
  /**
   * SignIn operation by username and password recovered from userLogin model attribute
   */
  signin(): void {
    this.error = '';
    this.authService.register(this.userLogin.username, this.userLogin.password)
      .subscribe(
        res => this.router.navigate(['']),
        err => this.handleError(err)
      )
  }

  /**
   * Custom error handler that represents a more familiar error message
   */
  handleError(err: any): any{
    if(err.status === 401) {
      this.error = 'Wrong credentials';
    }
    else if(err.status === 422 ) {
      this.error = 'The username already exists';
    }
    else {
      this.error = err.error.message;
    }
  }


  onLoginMode(): boolean {
    return this.mode === LoginType.LOGIN;
  }

  onSigninMode(): boolean {
    return this.mode === LoginType.SIGNIN;
  }

  checkValue(event: Event): any {
    const input: any = event.target;
    this.mode = input.checked ? LoginType.SIGNIN : LoginType.LOGIN;
  }
}
