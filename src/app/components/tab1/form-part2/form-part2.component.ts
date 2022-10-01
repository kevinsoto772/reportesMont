import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-form-part2',
  templateUrl: './form-part2.component.html',
  styleUrls: ['./form-part2.component.scss'],
})
export class FormPart2Component implements OnInit {
  @Input() reportes;

  reporte = {
    correo: '',
    descripcion: '',
    urlImage: ''
  };
  constructor(private modalCtrl: ModalController, private reportService: ReportsService, private alertCtrl: AlertController, private toastCtrl: ToastController ) { }

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
            this.reportService.postReports(JSON.stringify(this.reporte));
            this.modalCtrl.dismiss(true);
            this.presentToast(mensaje);
          },
        },
      ],
    });

    await alert.present();
  }

  onSubmit(formulario: NgForm) {    
  }

  async presentToast(mesaje: string) {
    const toast = await this.toastCtrl.create({
      message: mesaje,
      duration: 1500
    });
    toast.present();
  }



}
