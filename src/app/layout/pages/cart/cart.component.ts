import { afterNextRender, Component } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserCart } from '../../../shared/models/usercart';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private _CartService : CartService , private _ToastrService : ToastrService){
    afterNextRender(()=>{
      localStorage.setItem('currentPage', '/cart')
    })
  }

  userCart !: UserCart;

  ngOnInit(){
    this._CartService.getLogedUserCart().subscribe({
      next : (res) =>{
        this.userCart = res; 
      }
    })
  }

  deleteItem(_id : string){
      this._CartService.removeSpecificCartItem(_id).subscribe({
        next : (res) =>{
          this._ToastrService.success(res.status);
          this.userCart.data.products = res.data.products;
        }
      })
  }

  increment(_id : string , count : number){
    count = count + 1 ;
    this._CartService.updateCartProductQuantity(_id , count).subscribe({
      next : (res) =>{
        this.userCart.data.products = res.data.products;
        this._ToastrService.success("One item was added successfully!");
      }
    })
  }
  decrement(_id : string , count : number){

    if(count <= 1 ){
      this.deleteItem(_id);
    } else {
      count--;
      this._CartService.updateCartProductQuantity(_id , count).subscribe({
        next : (res) =>{
          this.userCart.data.products = res.data.products;
          this._ToastrService.success("One item was removed successfully!");
        }
      })
    }
    
  }
}
