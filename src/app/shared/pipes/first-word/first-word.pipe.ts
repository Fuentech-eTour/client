import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWord'
})
export class FirstWordPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value !== null || value !== '' || value !== undefined) {
      return value?.toString().split(' ')[0];
    } else {
      return null;
    }
  }
}
