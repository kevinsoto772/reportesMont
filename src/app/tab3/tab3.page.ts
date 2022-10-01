import { Component } from '@angular/core';
import { Reportes } from '../interfaces/interfaces';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get reports(): Reportes[] {
    return this.storageService.getLocalReports;
  }

  constructor(private storageService: StorageService) {}

}
