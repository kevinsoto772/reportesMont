import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Reportes } from '../interfaces/interfaces';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  
  public Types: string[] = ['acumulacion de basura', 'fallos en el sistema de alumbrado', 'fallo en la semaforizacion'];
  public selectedTypes: string = this.Types[0];
  public reports: Reportes[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.getTopHeadlinesByTypes(this.selectedTypes).subscribe(reports => {
    this.reports = [...this.reports, ...reports]
    })

    this.reportsService.getReports().subscribe(reports => {
      console.log(reports);
    })
    
  }

  segmentChanged(event: Event) {
    this.selectedTypes = (event as CustomEvent).detail.value;
    this.reportsService.getTopHeadlinesByTypes(this.selectedTypes).subscribe(reports => {
      this.reports = [...reports]
    })

  }

  OpenMenu(event: Event) {
    console.log(event);
  }

  pushLog(option: string) {
    console.log(option);
  }
}
