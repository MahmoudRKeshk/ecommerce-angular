import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {

  isCodeForm : boolean = false;
  isNewPassForm : boolean = false;

  
  isLoading : boolean = false

  constructor(private _AuthService:AuthService , private _Router:Router)
  {}

  emailForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email])
  })

  codeForm : FormGroup = new FormGroup({
    resetCode : new FormControl(null , [Validators.required])
  })

  resetPassForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email]) , 
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][0-9]{6}/)]) , 
  })


  verifyBtn()
  {

    this.isLoading = true
    this._AuthService.sendVerifyAPI(this.emailForm.value).subscribe({

      next : (res)=>{
        if(res.statusMsg == "success")
        {
          this.isCodeForm = true;
          this.isLoading = false
        }
      } ,
      error : (err)=>{}


    })
  }

  codeBtn()
  {
    this.isLoading = true
    this._AuthService.sendCodeAPI(this.codeForm.value).subscribe({

      next : (res) =>{

        if(res.status == "Success")
        {
          this.isCodeForm = false;
          this.isNewPassForm = true;
          this.isLoading = false
        }
      },
      error :(err)=>{}
    })
  }
  newPassBtn()
  {

    this.isLoading = true
    this._AuthService.sendNewPasswordAPI(this.resetPassForm.value).subscribe({

      next : (res)=>{

        //1- token , app , refresh
        localStorage.setItem("userToken" , res.token);

        // 2- call method userInfom()
        this._AuthService.userInform()

        // 3- navigate
        this._Router.navigate(['home'])

        this.isLoading = false


      } , 
      error : (err)=>{}
    })

  }

}
