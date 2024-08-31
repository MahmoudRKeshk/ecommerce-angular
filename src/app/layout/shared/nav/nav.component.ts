import { TranslateModule } from '@ngx-translate/core';

import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive, TranslateModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isLogedIn : boolean = false;

  constructor(private _AuthService : AuthService, private _Router : Router)
  {

  }

  ngOnInit(){
    if(this._AuthService.userData == null){
      this.isLogedIn = false;
    } else {
      this.isLogedIn = true;
    }
  }
  ngOnChanges(){
    if(this._AuthService.userData == null){
      this.isLogedIn = false;
    } else {
      this.isLogedIn = true;
    }
  }

  logout(){
    this.isLogedIn = false;
    localStorage.removeItem("userToken");
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login']);
  };


}
