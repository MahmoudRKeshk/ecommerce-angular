import { AllProducts } from './../../../shared/models/products';
import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, FormsModule, CarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  isLoading : boolean = true;
  name: string = '';
  constructor(private _ProductsService : ProductsService, private _Router : Router, private _CartService : CartService, private _ToastrService : ToastrService){}

  products !: AllProducts['data'];

  sliderImages:string[]=["assets/images/slider-image-1.jpeg",
    "assets/images/slider-image-2.jpeg",
    "assets/images/slider-image-3.jpeg"
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  
  ngOnInit(){
      this._ProductsService.getAllProducts().subscribe({
        next : (res)=>{
          this.products = res.data;
          this.isLoading = false;
        } ,
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          
        } ,
        complete:()=>{
          // do nthing for now
        }
      })
  }

  showProductDetails(productId : string){
    this._Router.navigate(['/details', productId]);
  };
  
  addToCart(_id : string){
    
    this._CartService.addProductToCart(_id).subscribe({
      next : (res)=>{
        this._ToastrService.success("Success" , "the product has been added to the cart successfully");
      } ,
      error : (err) =>{
        console.log(err.message);
        
      }
    })
   }
}
