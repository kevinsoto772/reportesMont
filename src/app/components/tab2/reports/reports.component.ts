import { Component, Input } from '@angular/core';
import { Reportes } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent{

  @Input() reports: Reportes[] = [];

  constructor() { }

  

}
