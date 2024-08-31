import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading : boolean = false;
  errMessage : string = '';

  constructor(private _Router : Router , private _AuthService : AuthService)
  {

  };


  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]) ,
    password : new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)])
  })


  loginSubmit()
   {

    this.isLoading = true

    this._AuthService.signin(this.loginForm.value).subscribe({

      next : (res)=>{
      
        this.isLoading = false

        //1- token , app , refresh
        localStorage.setItem("userToken" , res.token);

        // 2- call method userInfom()
        this._AuthService.userInform();

        // 3- navigate
        this._Router.navigate(['home']);

      },
      error : (err)=>{
        this.errMessage = err.error.message;
        this.isLoading = false;  
      }
    })
   }
}
