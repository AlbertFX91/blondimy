import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { UserLogin } from '../models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin;
  error: any;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userLogin = {
      username: '',
      password: ''
    };
    this.error = '';
  }

  onLogin(): void { 
    this.error = '';
    this.authService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
          res => this.router.navigate(['']),
          err => this.error = err.error,
      );

  }

  formFilled(): boolean {
    return this.userLogin.username.length > 0 && this.userLogin.password.length > 0;
  }
}
