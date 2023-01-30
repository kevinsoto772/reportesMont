import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticationService } from './services/autentication.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public name: string = ''
  private _storage: Storage | null = null;
  public readonly keyUserLocalStorage = 'user'

  constructor(private autenticationService: AutenticationService, private router: Router, private storage: Storage) {
    this.init()
  }
  
  public logOut() {
    this.autenticationService.logOut()
    this.router.navigateByUrl('/login')
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    if (await this._storage.get(this.keyUserLocalStorage)) {
      const userString = await this._storage.get(this.keyUserLocalStorage)
      const user = JSON.parse(userString)
      this.name = `${user.name} ${user.lastName}`
    }
  }
}
