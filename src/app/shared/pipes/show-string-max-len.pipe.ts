import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStringMaxLen'
})
export class ShowStringMaxLenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${value.toString().substring(0, 30)}...`;
  }

}
