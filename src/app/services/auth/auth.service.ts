import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { login, Register } from '../../shared/models/register';
import { env } from '../../shared/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router ,) 
  {
    if(typeof localStorage !== 'undefined')
      {
        if(localStorage.getItem("userToken") != null)
          {
      
            this.userInform()
           
            // this._Router.navigate([localStorage.getItem("currentPage")])
          }
      }
  }


  // service methods 
  
  signup(data:Register):Observable<any>
  {
    return this._HttpClient.post(`${env.BaseUrl}/api/v1/auth/signup` , data  );
  };

  signin(data:login):Observable<any>
  {
    return this._HttpClient.post(`${env.BaseUrl}/api/v1/auth/signin` , data  )
  }

  userInform()
  {
    
    this.userData.next(jwtDecode(  JSON.stringify(localStorage.getItem("userToken")) ));

  }

  //Forget Password Auth Services
  sendVerifyAPI(data:any):Observable<any>
  {
    return this._HttpClient.post(`${env.BaseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  sendCodeAPI(data:any):Observable<any>
  {
    return this._HttpClient.post(`${env.BaseUrl}/api/v1/auth/verifyResetCode` , data)
  }
  sendNewPasswordAPI(data:any):Observable<any>
  {
    return this._HttpClient.put(`${env.BaseUrl}/api/v1/auth/resetPassword` , data)
  }

}
