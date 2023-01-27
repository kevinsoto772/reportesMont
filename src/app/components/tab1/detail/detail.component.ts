import { Component, DoCheck, Input, OnInit } from '@angular/core';
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
export class DetailComponent implements DoCheck, OnInit{
  @Input()  type_id;

  public tabName: string = 'reportar';
  public  position = {
  lat: 8.74798,
  lng: -75.88143
}
  
  data: any;

  report = {
    type: 0,
    address: '',
    reference: '',
    latitude: 0,
    longitude: 0,
  };

  constructor(private modalCtrl: ModalController, public photoservice: PhotoService, private mapService: MapService) { }
  
  ngOnInit(){
    this.report.type =  this.type_id;
  }

  ngDoCheck() {
    const data = this.mapService.sendLocation();
    if (data !== undefined) {
      this.report.address = data.direccion.formatted_address;
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async continue() {
    this.report.type =  this.type_id;
    this.data = this.mapService.sendLocation();
    this.report.latitude = this.data.posicion.lat;
    this.report.longitude = this.data.posicion.lng;
    const modal = await this.modalCtrl.create({
      component: FormPart2Component,
      componentProps: {
        report: this.report,
      }
    });
    modal.present();
  }

  addnewToGallery() {
    this.photoservice.addnewToGallery();
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
  }

}
