import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  token: string;

  constructor(
    private apiService: ApiService
  ) { }

  public health(): Observable<any> {
    return this.apiService.health();
  }

  public login(username: string, password: string): Observable<any> {
    return this.apiService.post('/users/auth', {username: username, password: password})
      .pipe(map(user => {
          this.currentUser = user;
          this.token = user['token'];
          return user;
      }));
  }
  
}
