import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { photo, GalleryPhotos } from '../interfaces/interfaces';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  //arreglo para almacenar las fotos
  public photos: photo[] = [];
  public GalleryPhotos: GalleryPhotos[] = [];

  private PHOTO_STORAGE: string = "fotos";

  constructor(private platform: Platform) { }

  public async addnewToGallery() {
    //proceso para tomar una foto
    const photoCaptured = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // this.photos.unshift({
    //   filepath: "foto_",
    //   webviewPath: photoCaptured.webPath
    // });

    const savedImageFile = await this.savePicture(photoCaptured);
    this.photos.unshift(savedImageFile);
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  public async savePicture(Photo: Photo) {
    //convertir foto a formato base64
    const base64Data = await this.readAsBase64(Photo);
    //Escribir la foto en el directorio
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) { 
      return {
        filepath: savedFile.uri,
        webviewPath: Photo.webPath
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: Photo.webPath
      };
    }
    
  }

  public async readAsBase64(Photo: Photo) {

     // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: Photo.path,
      });

      return file.data;
     }else{
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

  public async loadSaved() {
    //recuperar las fotos de la cache 
    const ListPhotos = await Storage.get({ key: this.PHOTO_STORAGE })
    this.photos = JSON.parse(ListPhotos.value) || [];

    if (!this.platform.is('hybrid')) {
      //desplegar fotos leidas en formato base64
      for (let photo of this.photos) {
        //leer fotos almacenadas en el storage
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        })


        //Solo para webSites
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`
      }
    }

  }


  public async openGallery() {
    const photoGallery = await Camera.pickImages({
      quality: 100,
      correctOrientation: true,
    });

    this.GalleryPhotos = photoGallery.photos
    console.log(photoGallery,'galeria xd',this.GalleryPhotos);
    
  }



  public async deletePicture(photo: photo, position: number) {
    // Remove this photo from the Photos reference data array

    if (this.photos != []) {
      this.photos.splice(position, 1);

      // Update photos array cache by overwriting the existing photo array
      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });

      // delete photo file from filesystem
      const filename = photo.filepath.substring(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });
    } else {
      console.log('No hay mas fotos');
    }

  }


}
