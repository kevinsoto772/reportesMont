import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/interfaces';
import { ReportsService } from 'src/app/services/reports.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {
  public reports: Report[] = [];
  private _storage: Storage | null = null;
  public readonly keyUserLocalStorage = 'user'

  constructor(private reportsService: ReportsService, private storage: Storage) { }

  ngOnInit() {
    this.init()
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.getLocalInformation();
  }

async getLocalInformation() {
  try {
    if (await this._storage.get(this.keyUserLocalStorage)) {
      const userString = await this._storage.get(this.keyUserLocalStorage)
      const user = JSON.parse(userString)
      this.reportsService.getReportsByDocument(user.document).subscribe((reports: any) => {
        this.reports = [...this.reports, ...reports.reports];
        }, (err: any) => console.log(err))
    }
    
  } catch (error) {
      }
}
}
