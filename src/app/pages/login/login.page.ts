import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from 'src/app/components/login/login-modal/login-modal.component';
import { RegisterComponent } from 'src/app/components/login/register/register.component';
import { loginResponse } from 'src/app/interfaces/interfaces';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private autenticationService: AutenticationService,private router: Router, private modalCtrl: ModalController) { 
  }

  ngOnInit() {
  }

  public async login(): Promise<void>{
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
    });
    modal.present();
  }

  public async register() {
    const modal = await this.modalCtrl.create({
      component: RegisterComponent,
    });
    modal.present();
  }

}
