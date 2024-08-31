import { Pipe, PipeTransform } from '@angular/core';
import { AllProducts } from '../models/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data : AllProducts["data"] , input : string): AllProducts["data"] {
    
    return data.filter(p =>{
      return p.title.toLowerCase().includes(input.toLowerCase());
    });
  }

}
