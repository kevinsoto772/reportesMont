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

  constructor(private platform: Platform, private http: HttpClient, private loadingCtrl: LoadingController) { }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {

      console.log('HERE: ', result);
      this.loadFileData(result.files);

    }, async err => {
      console.log('err: ', err)
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      });
    }).then(_ => {
      loading.dismiss();
    })

  }

  async loadFileData(filenames: string[]) {
    for (let f of filenames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      })
      console.log('READ: ', readFile);
    }

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
    
    if (this.photos != []) {
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

  public async startUpload(file: photo) {
    
    const base64Data = await this.readAsBase64(file);
    const formData = new FormData();

    formData.append('file', 'zzzz');
    let data = { 'file': base64Data };
    let dataJson= JSON.stringify(data);
    this.uploadData(dataJson);
    console.log(dataJson)


  }

  async uploadData(formdata: string) {
    // FormData
    const url = 'http://localhost:3000/imagenes';
 
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formdata,
    }
    );

    // this.http.post(url, formdata).subscribe(res => {
    //   console.log(res);
    // })
  }


}
