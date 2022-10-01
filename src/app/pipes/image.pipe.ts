import { Pipe, PipeTransform } from '@angular/core';

const URL = 'https://source.unsplash.com/category/nature/';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, size: string = '800x600'): string {

    if (!img) {
      return './assets/no-image-banner.jpg';
    }

    const imgUrl = `${URL}/${size}${img}`;

    //console.log('URL', imgUrl);

    return imgUrl;


  }

}
