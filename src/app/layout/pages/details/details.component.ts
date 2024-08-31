import { productDetails } from './../../../shared/models/details';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(private route: ActivatedRoute, private _ProductsService: ProductsService) {}
  customOptions: any = {
    items: 1,          // Shows only one item at a time
    loop: true,        // Enables infinite looping of slides
    nav: true,         // Displays navigation arrows
    dots: true,        // Displays pagination dots
    margin: 10,        // Sets margin between slides (adjust as needed)
    autoHeight: true,  // Automatically adjusts the height based on the content
  };
  
  productId!: any;
  productDetails!: productDetails | null;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
    });

    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(this.productDetails);
      }, 
      error: (err) => {
        console.log(err);
      } 
    });
  }
}