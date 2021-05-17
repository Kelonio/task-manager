import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { 
   
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/list');
      
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data: any) => {

        console.log(data);

        if (data.message == 'success!'){
          this.tokenStorage.saveToken(data.token);

          this.tokenStorage.saveUser(this.form.username);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();  

        } else{
          this.isLoginFailed = true;
          this.errorMessage = data.message;
        }             
        
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
