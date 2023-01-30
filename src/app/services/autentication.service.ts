import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const apiURL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  public readonly keyTokenLocalStorage = 'jwt'
  public readonly keyUserLocalStorage = 'user'
  private _storage: Storage | null = null;

  headers: HttpHeaders;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init()
    this.headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    }

  login(user: string, password: string): Observable<any>{
    const endpoint = `/users/login`
    return this.http.post<any>(`${apiURL}${endpoint}`, {user: user, password: password}, {headers: this.headers})
  }

  register(newUser: any): Observable<any>{
    const endpoint = `/users/register`
    return this.http.post<any>(`${apiURL}${endpoint}`, newUser, {headers: this.headers})
  }

  public logOut(){
    this._storage.remove(this.keyUserLocalStorage)
    this._storage.remove(this.keyTokenLocalStorage)
  }

  public saveLoginInformation(jwt:string, Usuario: object):void{
    console.log('Guardando Información de inicio de sesión')
    console.log('Nuevo token', jwt)
    this._storage.set(this.keyUserLocalStorage, JSON.stringify(Usuario));
    this._storage.set(this.keyTokenLocalStorage, jwt);
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
