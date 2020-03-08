import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `${environment.APIEndpoint}/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.onError));
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.onError));
  }

  put<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.onError));
  }

  delete<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.onError));
  }

  health(): Observable<any> {
    return this.get('/health');
  }

  private onError(error: any) {
    return throwError(error);
  }

}
