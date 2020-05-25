import { Pipe, PipeTransform } from '@angular/core';
import { CartService } from './../../../core/services/cart.service';

@Pipe({
  name: 'countProduct'
})
export class CountProductPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
