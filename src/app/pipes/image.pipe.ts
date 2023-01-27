import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string): string {

    if (!img) {
      return './assets/no-image-banner.jpg';
    }

  }

}
