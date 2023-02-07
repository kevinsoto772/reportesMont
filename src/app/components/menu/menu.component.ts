import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public name: string = ''
  public readonly keyUserLocalStorage = 'user'
  constructor(private storage: Storage) { }

  ngOnInit() { 
    this.getLocalInformation();
  }
  
  public async getLocalInformation() {
    try {
      if (await this.storage.get(this.keyUserLocalStorage)) {
        const userString = await this.storage.get(this.keyUserLocalStorage)
        const user = JSON.parse(userString)
        this.name = `${user.name} ${user.lastName}` || ''
      }
      
    } catch (error) {
        }
  }

}
