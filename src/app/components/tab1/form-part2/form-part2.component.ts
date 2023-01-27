import { Component,Input, OnInit} from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { NgForm } from '@angular/forms';
import { ReportsService } from '../../../services/reports.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-form-part2',
  templateUrl: './form-part2.component.html',
  styleUrls: ['./form-part2.component.scss'],
})
export class FormPart2Component implements OnInit {
  @Input() reports;

  report = {
    email: '',
    description: '',
    user_document: '',
    Image: ''
  };
  constructor(private modalCtrl: ModalController, private reportService: ReportsService, private alertCtrl: AlertController, private toastCtrl: ToastController, public photoservice: PhotoService ) { }

  ngOnInit() { }
  
  cerrar() {
    this.modalCtrl.dismiss();
  }

  async SendReport() {
    const alert = await this.alertCtrl.create({
      header: '¿Quieres enviar tu reporte?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Enviar',
          role: 'confirm',
          handler: () => {
            const mensaje = 'Reporte enviado'
            this.reportService.postReports(this.report);
            Preferences.clear();
            this.modalCtrl.dismiss();
            this.presentToast(mensaje);
          },
        },
      ],
    });

    await alert.present();
  }

  onSubmit(formulario: NgForm) {  
  }

  async presentToast(mesage: string) {
    const toast = await this.toastCtrl.create({
      message: mesage,
      duration: 1500
    });
    toast.present();
  }



}
