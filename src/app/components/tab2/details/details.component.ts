import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportsService } from 'src/app/services/reports.service';
import { StorageService } from 'src/app/services/storage.service';
import {Reportes } from '../../../interfaces/interfaces';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  @Input() id;

  public report: Reportes;
  public tabName: string = 'buscar';
  public ocultar = 150;
  public position: any;

  slideOpt = {
    slidesPerView: 1.1,
    freeMode: true
  };

  star = 'star-outline';

  constructor(private reportService: ReportsService, private modalCtrl: ModalController, private storageService: StorageService, private mapService: MapService) { }

  ngOnInit() {
    this.reportService.getReportsID(this.id).subscribe(data => {
      this.report = data;
      this.position = {
        lat: data.latitud,
        lng: data.longitud
      }
      this.mapService.addMarker(this.position);
    })

    this.storageService.ReportExist(this.id).then(exist => this.star = (exist) ? 'star' : 'star-outline');

    
  } 

  back() {
    this.modalCtrl.dismiss();
  }

  favorite() {
    this.storageService.saveRemoveReport(this.report).then(exist => this.star = (exist) ? 'star' : 'star-outline');
  }

  }


