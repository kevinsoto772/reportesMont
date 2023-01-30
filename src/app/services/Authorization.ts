import { Storage } from '@ionic/storage-angular';

export class Authorization {
  private _storage: Storage | null = null;
  public readonly keyTokenLocalStorage = 'jwt'

  public constructor(private storage: Storage) { }
  

  public async getAuthorizationToken(): Promise<string>{
    const storage = await this.storage.create();
    this._storage = storage;
    const token = await this._storage.get(this.keyTokenLocalStorage)
      if(token) return token;
      else throw new Error("No se encontró el token de autorización en el localStorage");
  }
}
