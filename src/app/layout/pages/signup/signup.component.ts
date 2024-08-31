import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private _AuthService : AuthService, private _Router : Router)
  {

  }


  isLoading : boolean = false;

  errMessage : string = '';


  registerForm : FormGroup = new FormGroup({
    
    name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]) ,
    email : new FormControl(null ,  [Validators.required , Validators.email ] ),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^(010|011|012)[0-9]{8}$/) ]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][0-9]{6}/)]),
    rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][0-9]{6}/)])

  }, this.confirmPAssword);

  confirmPAssword(g:any)
  {
    if(  g.get('password').value === g.get('rePassword').value  )
    {
      return null
    }
    else
    {
      return {passMatched : true}
    }
  }
  
  registerSubmit()
   {

    this.isLoading = true

    this._AuthService.signup(this.registerForm.value).subscribe({

      next : (res)=>{
      
        this._AuthService.userInform();
        this.isLoading = false
        this._Router.navigate(['login']);
        console.log(res);
        

      },
      error : (err)=>{
        this.errMessage = err.error.message
        this.isLoading = false
      }
    })

   }

}
