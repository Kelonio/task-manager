import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {


  form: any = {};  
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      (data: any) => {       
          this.errorMessage =  data.user + ' has been register sucessfully';        
      },
      (err: any) => {
           this.errorMessage = err.error.message;
        
      }
    );
  }

}
