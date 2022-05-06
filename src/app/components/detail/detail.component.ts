import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { FormPart2Component } from '../form-part2/form-part2.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() tipo;


  constructor(private modalCtrl: ModalController, public photoservice: PhotoService) { }

  ngOnInit() { }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async continue() {
    const modal = await this.modalCtrl.create({
      component: FormPart2Component,
      componentProps: {
        tipo: this.tipo,
      }
    });
    modal.present();
  }

  addnewToGallery(){
    this.photoservice.addnewToGallery();
  }

}
