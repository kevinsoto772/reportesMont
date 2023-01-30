import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { FormPart2Component } from '../form-part2/form-part2.component';
import { photo} from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements DoCheck, OnInit{
  @Input()  type_id;
  public form: FormGroup
  public tabName: string = 'reportar';
  public  position = {
  lat: 8.74798,
  lng: -75.88143
}
  
  location: any;


  constructor(private modalCtrl: ModalController, public photoservice: PhotoService, private mapService: MapService) { 
    this.form = new FormGroup({
      address: new FormControl({value:'', disabled: true}, [Validators.required],  ),
      reference: new FormControl('', [Validators.required]),
      type: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    })
  }
  
  ngOnInit() {
    this.form.controls['type'].setValue(this.type_id)
  }

  ngDoCheck() {
    const location = this.mapService.sendLocation();
    if (location !== undefined) {
      this.form.controls['address'].setValue(location.direccion.formatted_address)
      this.form.controls['address'].enable()
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async continue() {
    this.location = this.mapService.sendLocation();
    this.form.controls['latitude'].setValue(this.location.posicion.lat)
    this.form.controls['longitude'].setValue(this.location.posicion.lng)
    const modal = await this.modalCtrl.create({
      component: FormPart2Component,
      componentProps: {
        form: this.form,
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

  Mygeolocation() {
    this.mapService.getGeolocation();
  }

}
