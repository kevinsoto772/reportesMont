import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { loginResponse } from 'src/app/interfaces/interfaces';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  public form: FormGroup

  constructor(private autenticationService: AutenticationService, private router: Router, private modalCtrl: ModalController) { 
    this.form = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }
  ngOnInit() { }
  
  public login(): void{
    if (this.form.invalid) {
      this.MarkAsDirty()
    }
    if (this.form.valid) {
      this.autenticationService.login( this.form.controls['user'].value.toString(), this.form.controls['password'].value,).subscribe((res: loginResponse)=>{
        this.autenticationService.saveLoginInformation(
          res.token,
          res.user
        )
        this.router.navigateByUrl('/reports/tabs/tab2')
        this.modalCtrl.dismiss();
      }, (error: HttpErrorResponse) => {
        console.log(error)
      })
    }
  }

  public MarkAsDirty():void{
    (<any>Object).values(this.form.controls).forEach((control:FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }


  close() {
    this.modalCtrl.dismiss();
  }


}
