import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo, GalleryPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { photo, LocalFile } from '../interfaces/interfaces';
import { LoadingController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const IMAGE_DIR = 'stored-images';


let photo: photo;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  //arreglo para almacenar las fotos
  public photos: photo[] = [];
  images: LocalFile[] = [];

  private PHOTO_STORAGE: string = "fotos";

  constructor(private platform: Platform, private http: HttpClient, private loadingCtrl: LoadingController) {
    }


  public async addnewToGallery() {
    //proceso para tomar una foto
    const photoCaptured: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(photoCaptured);
    this.photos.unshift(savedImageFile);
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  public async savePicture(Photo: photo) {
    //convertir foto a formato base64
    const base64Data = await this.readAsBase64(Photo);
    //Escribir la foto en el directorio
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      return {
        path: savedFile.uri,
        webPath: Photo.webPath
      };
    } else {
      return {
        path: `${IMAGE_DIR}/${fileName}`,
        webPath: Photo.webPath
      };
    }
  }

  public async readAsBase64(Photo: photo) {

    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: Photo.path,
      });

      return file.data;
    } else {
      //convertir de blob a Base64 
      const response = await fetch(Photo.webPath!)
      const blob = await response.blob();

      return await this.converBlobToBase64(blob) as string;
    }

  }

  converBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

  public async openGallery() {
    let photo: photo;
    const photoGallery = await Camera.pickImages({
      quality: 100,
      correctOrientation: true,
    });

    photoGallery.photos.forEach(async (galleryPhoto: GalleryPhoto) => {
      photo = {
        path: galleryPhoto.path,
        webPath: galleryPhoto.webPath
      }

      const data = await this.savePicture(photo);
      this.photos.unshift(data);
      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      })
    });

  }

  public async deletePicture(photo: photo, position: number) {
    const photos: any = []
    if (this.photos != photos) {
      this.photos.splice(position, 1);

      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });

      if (photo.path != undefined) {
        const filename = photo.path.substring(photo.path.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
          path: `${IMAGE_DIR}/${filename}`,
          directory: Directory.Data,
        });
      }
    } else {
      console.log('No hay mas fotos');
    }
  }

  public async setPhotos(formdata: FormData): Promise<FormData>{
    
    const photosString = await Storage.get({ key: this.PHOTO_STORAGE });
    const photos: photo[] = JSON.parse(photosString.value);
    console.log(photos)

    for (let photo of photos) {
      let response = await fetch(photo.webPath!)
      let blob = await response.blob();
      
    formdata.append('images[]', blob)

    }

    return formdata;
  }


}
