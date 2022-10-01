import {Component, DoCheck, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { FormPart2Component } from '../form-part2/form-part2.component';
import { photo} from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, DoCheck{
  @Input() tipo;

  public tabName: string = 'reportar';
  public  position = {
  lat: 8.74798,
  lng: -75.88143
}
  
  data: any;

  reporte = {
    tipo: '',
    direccion: '',
    referencia: '',
    correo: '',
    latitud: 0,
    longitud: 0,
    descripcion: '',
    utlImage: ''
  };

  constructor(private modalCtrl: ModalController, public photoservice: PhotoService, private mapService: MapService) { }

  ngDoCheck() {
    const data = this.mapService.sendLocation();
    if (data !== undefined) {
      this.reporte.direccion = data.direccion.formatted_address;
    }
  }


  async ngOnInit() {
    this.photoservice.loadFiles;    
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async continue() {
    this.reporte.tipo = this.tipo;
    this.data = this.mapService.sendLocation();
    this.reporte.latitud = this.data.posicion.lat;
    this.reporte.longitud = this.data.posicion.lng;
    const modal = await this.modalCtrl.create({
      component: FormPart2Component,
      componentProps: {
        reporte: this.reporte,
      }
    });
    modal.present();
  }

  addnewToGallery() {
    this.photoservice.addnewToGallery();
  }

  postimage(photo: photo) {
    this.photoservice.startUpload(photo);
  }

  SearchInGallery() {
    this.photoservice.openGallery();
  }

  deletePicture(photo: photo, position: number) {
    this.photoservice.deletePicture(photo, position);
  }

  onSubmit(formulario: NgForm) {
    console.log(formulario);
    
  }

  Mygeolocation() {
    const resp = this.mapService.getGeolocation();
    console.log(resp);
  }

}
