import { Component, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Reportes } from 'src/app/interfaces/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @Input() report: Reportes;
  @Input() index: number;

  
  constructor(private actionSheetCtrl: ActionSheetController, private storageService: StorageService, private modalCtrl: ModalController) { }

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
          icon: reportInFavorite? 'heart' : 'heart-outline',
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
