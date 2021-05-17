import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {

    console.log(AUTH_API + 'login' + credentials.username );
    var formData: any = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.http.post(AUTH_API + 'login',formData);
  }

  
}
