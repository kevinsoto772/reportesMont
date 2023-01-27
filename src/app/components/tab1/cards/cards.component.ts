import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../../tab1/detail/detail.component';
import { ReportsService } from '../../../services/reports.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})

export class CardsComponent implements OnInit {

  reports_types = [];

  constructor(private modalCtrl: ModalController, private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.getReportsTypes().subscribe(data => {
      this.reports_types[0] = data[0].id;
      this.reports_types[1] = data[1].id;
      this.reports_types[2] = data[2].id;
    });
  }

  async reportar(type_id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        type_id
      }
    });
    modal.present();
  }
}
