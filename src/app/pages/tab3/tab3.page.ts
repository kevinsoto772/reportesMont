import { Component} from '@angular/core';
import { Report } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  get reports(): Report[] {
    return this.storageService.getLocalReports;
  }

  constructor(private storageService: StorageService) { }
  

}
