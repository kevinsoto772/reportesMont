import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-part2',
  templateUrl: './form-part2.component.html',
  styleUrls: ['./form-part2.component.scss'],
})
export class FormPart2Component implements OnInit {
  @Input() tipo;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  
  cerrar() {
    this.modalCtrl.dismiss();
  }

}
