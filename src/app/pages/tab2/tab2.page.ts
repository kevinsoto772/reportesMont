import { Component, OnInit} from '@angular/core';
import { Report } from '../../interfaces/interfaces';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  public Types: any[] = [];
  public selectedTypes: number;
  public reports: Report[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.getReportsTypes().subscribe(types => {
      this.Types = types
      this.selectedTypes = this.Types[0].id
      this.reportsService.getTopHeadlinesByTypes(this.selectedTypes).subscribe((reports: any) => {
        this.reports = [...this.reports, ...reports.reports];
        console.log('entro al subscribe')
        }, (err: any) => console.log(err))
    });

  }

  segmentChanged(event: Event) {
    this.selectedTypes = (event as CustomEvent).detail.value;
    this.reportsService.getTopHeadlinesByTypes(parseInt(this.selectedTypes.toString())).subscribe((reports: any) => {
      this.reports = reports.reports
    })

  }
}
