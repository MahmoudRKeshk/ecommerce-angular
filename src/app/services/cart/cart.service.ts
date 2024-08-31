import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userTokenHeader : any = {"token" : localStorage.getItem("userToken")}
  constructor(private _HttpClient : HttpClient) { }

  addProductToCart(_productId : string) : Observable<any> 
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart" , {"productId" : _productId} ,{
      headers : {"token" : this.userTokenHeader.token}
    })
  }

  updateCartProductQuantity(_id : string , _count : number) : Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${_id}` , {"count" : _count} , {
      headers : {token : this.userTokenHeader.token}
    })
  }

  getLogedUserCart() : Observable<any> 
  {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers : {token : this.userTokenHeader.token}
    })
  }

  removeSpecificCartItem(_id : string) : Observable<any> 
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${_id}`, {
      headers : {token : this.userTokenHeader.token}
    })
  }

  clearUserCart() : Observable<any> 
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers : {token : this.userTokenHeader.token}
    })
  }
}
