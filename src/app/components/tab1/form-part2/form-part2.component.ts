import { Component,Input, OnInit} from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReportsService } from '../../../services/reports.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-form-part2',
  templateUrl: './form-part2.component.html',
  styleUrls: ['./form-part2.component.scss'],
})
export class FormPart2Component implements OnInit {
  @Input() form;
  public form_detail: FormGroup
  public readonly keyUserLocalStorage = 'user'
  constructor(private modalCtrl: ModalController, private reportService: ReportsService, private alertCtrl: AlertController, private toastCtrl: ToastController, public photoservice: PhotoService, private storage: Storage) { 
    this.form_detail = new FormGroup({
      email: new FormControl('', [Validators.required],  ),
      description: new FormControl('', [Validators.required]),
      user_document: new FormControl('', Validators.required),
    })
  }

  ngOnInit() { 
    this.getLocalInformation()
    
  }

  public async getLocalInformation() {
    try {
      if (await this.storage.get(this.keyUserLocalStorage)) {
        const userString = await this.storage.get(this.keyUserLocalStorage)
        const user = JSON.parse(userString)
        this.form_detail.controls['email'].setValue(user.email);
        this.form_detail.controls['user_document'].setValue(user.document);
      }
      
    } catch (error) {
        }
  }

  
  cerrar() {
    this.modalCtrl.dismiss();
  }

  async SendReport() {
    const report = {
      type: this.form.controls['type'].value,
      address: this.form.controls['address'].value,
      reference: this.form.controls['reference'].value,
      latitude: this.form.controls['latitude'].value,
      longitude: this.form.controls['longitude'].value,
      email: this.form_detail.controls['email'].value,
      description: this.form_detail.controls['description'].value,
      user_document: this.form_detail.controls['user_document'].value,
    }
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
            this.reportService.postReports(report);
            this.photoservice.photos = []
            Preferences.clear();
            this.modalCtrl.dismiss({close:true});
            this.presentToast(mensaje);
          },
        },
      ],
    });

    await alert.present();
  }


  async presentToast(mesage: string) {
    const toast = await this.toastCtrl.create({
      message: mesage,
      duration: 1500
    });
    toast.present();
  }



}
