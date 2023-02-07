import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { createNewUser } from 'src/app/interfaces/createNewUser';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup
  constructor(private modalCtrl: ModalController, private autenticationService: AutenticationService, private alertCtrl: AlertController, private toastCtrl: ToastController,) { 
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }

  customAlertOptions = {
    header: 'Tipo de documento',
    subHeader: 'Selecciona tu tipo de documento',
    message: 'Escoge solo una opción',
    translucent: true,
  };


  ngOnInit() { }

  public async register() {

    const alert = await this.alertCtrl.create({
      header: '¿Quieres registrarte con esta información?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Registrar',
          role: 'confirm',
          handler: () => {
            if (this.formRegister.valid) {
              this.autenticationService.register(new createNewUser(
                this.formRegister.controls['name'].value,
                this.formRegister.controls['lastName'].value,
                this.formRegister.controls['document'].value.toString(),
                this.formRegister.controls['documentType'].value,
                this.formRegister.controls['phone'].value.toString(),
                this.formRegister.controls['email'].value,
                this.formRegister.controls['password'].value
                )).subscribe((res) => {
                  console.log(res)
                  const mensaje = 'Registro Exitoso'
                  this.modalCtrl.dismiss();
                  this.presentToast(mensaje);
                }, (error: HttpErrorResponse) => {
                  console.log(error)
                  const mensaje = 'Ha ocurrido un error al registrarte'
                  this.presentToast(mensaje);
              })
            }
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
  
  close() {
    this.modalCtrl.dismiss();
  }

}
