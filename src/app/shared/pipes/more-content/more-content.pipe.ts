import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moreContent'
})
export class MoreContentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value.toString().length > (args[0])) {
      return `${value}...`;
    } else {
      return value;
    }
  }

}
