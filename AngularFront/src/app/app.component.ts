import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mima-todo';
  username?: string;

  isLoggedIn: Observable<boolean>;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { 
    this.isLoggedIn = this.authService.isLoggedIn();

    /* me subscribo para sacar el nombre*/
    this.isLoggedIn.subscribe((val)=>{
      if (val){
        const user = this.tokenStorageService.getUser();
        this.username = user;       

      }else {
        this.username = ""; //realmente no hace falta puesto que no se ve
      }
      
    })
  }

  ngOnInit(): void {    
   
  }

  logout(): void {
    this.authService.logOut();  
    
  }

}
