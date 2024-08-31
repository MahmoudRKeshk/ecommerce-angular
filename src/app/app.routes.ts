import { Routes } from '@angular/router';
import { ProductsComponent } from './layout/pages/products/products.component';
import { AboutComponent } from './layout/pages/about/about.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { SignupComponent } from './layout/pages/signup/signup.component';
import { ContactComponent } from './layout/pages/contact/contact.component';
import { DetailsComponent } from './layout/pages/details/details.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetComponent } from './layout/pages/forget/forget.component';

export const routes: Routes = [
    {
        path : '' ,
        component : HomeComponent
    } ,
    {
        path : "home" ,
        component : HomeComponent
    } ,
    {
        path : "products" ,
        component : ProductsComponent ,
        canActivate : [authGuard]
    } ,
    {
        path : "details/:id" ,
        component : DetailsComponent,
        canActivate : [authGuard]
    } ,
    {
        path : "about" ,
        component : AboutComponent,
        canActivate : [authGuard]
    } ,
    {
        path : "cart" ,
        component : CartComponent,
        canActivate : [authGuard]
    } ,
    {
        path : "login" ,
        component : LoginComponent
    } ,
    {
        path : "signup",
        component : SignupComponent
    } ,
    {
        path : "forget" ,
        component : ForgetComponent
    } ,
    {
        path : "contact" ,
        component : ContactComponent,
        canActivate : [authGuard]
    }
];
