import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const AUTH_API = environment.apiUrl + '/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    
    var formData: any = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.http.post(AUTH_API + 'login',formData);
  }

  register(credentials:any): Observable<any> {

    
    var formData: any = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.http.post(AUTH_API + 'register',formData);
  }

  
}
