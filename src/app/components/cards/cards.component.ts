import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  tipo_reporte = ['acumulacion de basura','fallos en el sistema de alumbrado','fallo en la semaforizacion'];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  
  async reportar(tipo: string){
   const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        tipo
      }
   });
    modal.present();
    console.log(tipo);
  }
}
