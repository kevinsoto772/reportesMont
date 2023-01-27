import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Report } from 'src/app/interfaces/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit{
  @Input() report: Report;
  @Input() index: number;
  public Type: string;
  
  constructor(private actionSheetCtrl: ActionSheetController, private storageService: StorageService, private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.report.type == 1) {

      this.Type = 'Daño en alumbrado público'

    } else if (this.report.type == 2) {

      this.Type = 'Acumulación de basura'

    } else if (this.report.type == 3) {

      this.Type = 'Fallo de semáforo'

    }
  }

  async OpenReport(id: number) {
   const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
   })
    
    modal.present();
  }

  async onOpenMenu() {

    const reportInFavorite = this.storageService.articleInFavorite(this.report);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: '',
      buttons: [
        {
          text: reportInFavorite? 'Remover apoyo' : 'Apoyar',
          icon: reportInFavorite? 'push' : 'push-outline',
          handler: () => this.onToggleFeedback()
        },
        {
          text: 'Cerrar',
          icon: 'close-outline',
          role: 'cancel'
      }
      ]
    });

    await actionSheet.present();
  }

  onToggleFeedback() {
    this.storageService.saveRemoveReport(this.report);
  }

}
