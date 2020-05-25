import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moreContent'
})
export class MoreContentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
