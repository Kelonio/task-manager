import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { TokenStorageService } from './token-storage.service';



const AUTH_API = environment.apiUrl + '/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

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


  public isLoggedIn(): Observable<boolean> {    
    return this.isLoginSubject.asObservable();
  }

  public logOut(){
    this.tokenService.signOut();
    this.isLoginSubject.next(false);
  }

  public confirmLogin(value:boolean){
    this.isLoginSubject.next(value);
  }

  private hasToken(): boolean{
    return this.tokenService.getToken() !== null;
  }

  
}
