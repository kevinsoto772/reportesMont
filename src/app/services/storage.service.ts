import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Report } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localReports: Report[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) { 
    this.init();
  }

  async presentToast(mesaje: string) {
    const toast = await this.toastCtrl.create({
      message: mesaje,
      duration: 1500
    });
    toast.present();
  }

  get getLocalReports() {
    return [...this._localReports];
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
  }

  async saveRemoveReport(report: Report) {
    let mensaje = '';

    const exists = this._localReports.find(localReport => localReport.id === report.id);
    
    if (exists) {
      this._localReports = this._localReports.filter(localReport => localReport.id !== report.id);
      mensaje = 'Removido de apoyados'
    } else {
      this._localReports = [report, ...this._localReports];
      mensaje = 'Agregado a apoyados'
    }    

    this.presentToast(mensaje);
    this._storage.set('reports', this._localReports);

    return !exists;
  }

  async loadFavorites() {
    try {
      const reports = await this._storage.get('reports');
      this._localReports = reports || [];
      
    } catch (error) {
        }
  }

  articleInFavorite(report: Report) {

    return !!this._localReports.find(localStorage => localStorage.id === report.id);
  }

  async ReportExist(id: number) {

    const exist = this._localReports.find(localReport => localReport.id === id);

    return (exist) ? true : false;
  }


}
