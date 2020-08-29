import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerUrl'
})
export class SanitizerUrlPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer,
  ) {}

  transform(value: string, args?: any): any {

    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);

  }

}
