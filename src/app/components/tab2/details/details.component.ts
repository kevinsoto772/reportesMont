import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportsService } from 'src/app/services/reports.service';
import { StorageService } from 'src/app/services/storage.service';
import { Report } from '../../../interfaces/interfaces';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  @Input() id;
  public Type: string;

  public report: Report;
  public tabName: string = 'buscar';
  public ocultar = 150;
  public position: any;
  public image_array: any;

  slideOpt: any;
  push = 'push-outline';

  constructor(private reportService: ReportsService, private modalCtrl: ModalController, private storageService: StorageService, private mapService: MapService) { }

  ngOnInit() {
    this.reportService.getReportsID(this.id).subscribe(data => {
      this.report = data;
      this.image_array = this.report.images;
      this.position = {
        lat: data.latitude,
        lng: data.longitude
      }

      if (this.report.type == 1) {

        this.Type = 'Daño en alumbrado público'

      } else if (this.report.type == 2) {

        this.Type = 'Acumulación de basura'

      } else if (this.report.type == 3) {

        this.Type = 'Fallo de semáforo'

      }

      if (this.report.images.length > 1) {
        this.slideOpt = {
          slidesPerView: 1.1,
          freeMode: true
        };
      } else {
        this.slideOpt = {
          freeMode: true
        };
      }

    })




    this.storageService.ReportExist(this.id).then(exist => this.push = (exist) ? 'push' : 'push-outline');


  }

  back() {
    this.modalCtrl.dismiss();
  }

  support() {
    this.storageService.saveRemoveReport(this.report).then(exist => this.push = (exist) ? 'push' : 'push-outline');
  }

}


