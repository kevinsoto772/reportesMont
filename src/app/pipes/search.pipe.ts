import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], text: string = ''): any[] {
    if (text == '') {
      return array;
    }

    if (!array) {
      return array;
    }

    text = text.toLocaleLowerCase();

    return array.filter(item => item.description.toLowerCase().includes(text));
  }

}
