import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup
  constructor(private modalCtrl: ModalController) { 
    this.formRegister = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit() { }
  
  close() {
    this.modalCtrl.dismiss();
  }

}
