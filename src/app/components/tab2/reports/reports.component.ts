import { Component, Input } from '@angular/core';
import { Report } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent{

  @Input() reports: Report[] = [];

  text: string = '';

  constructor() { }
  

  
  onSearchChange(event) {
    this.text = event.detail.value
    }

  

}
