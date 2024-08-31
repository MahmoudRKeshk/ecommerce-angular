import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../shared/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient : HttpClient) { }

  getAllProducts() : Observable<any>
  {
    return this._HttpClient.get(`${env.BaseUrl}/api/v1/products`);
  }

  getSpecificProduct(_id : string) : Observable<any>
  {
    return this._HttpClient.get(`${env.BaseUrl}/api/v1/products/${_id}`)
  }
}
