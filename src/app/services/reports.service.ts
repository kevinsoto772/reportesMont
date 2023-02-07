import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Report } from '../interfaces/interfaces';
import { PhotoService } from './photo.service';
import { Storage } from '@ionic/storage-angular';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReportsService implements OnInit{
  headers: HttpHeaders;
  private _storage: Storage | null = null;
  private _token: string = ''
  public readonly keyTokenLocalStorage = 'jwt'

  constructor(private http: HttpClient, public photoservice: PhotoService, private storage: Storage) {
    this.init()
    this.headers = new HttpHeaders({
      "API-KEY": "p5iZ3e4i2hMMUMJh1bgUwFfNTS",
      "Authorization": `Bearer ${this._token}`
    });
  }
  ngOnInit(): void {

  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.getLocalInformation()
  }

  async getLocalInformation() {
    try {
      if (await this._storage.get(this.keyTokenLocalStorage)) {
        const token = await this._storage.get(this.keyTokenLocalStorage)
        if(token) this._token = token;
        else throw new Error("No se encontró el token de autorización en el localStorage");
      }
      
    } catch (error) {
        }
  }


  getReports(): Observable<any> {
    const query = apiURL + '/reports';
    return this.http.get<any>(query, {headers: this.headers});
  }

  getReportsTypes() {
    const query = apiURL + `/report-types`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  getTopHeadlinesByTypes(type: number): Observable<Report[]> {
    const query = apiURL + `/reports/search?type=${type}&followsOrder=asc`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  getReportsByFollowers(type: number): Observable<Report[]> {
    const query = apiURL + `/reports/search?type=${type}&followsOrder=desc`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  getReportsByDocument(document: string): Observable<Report[]> {
    const query = apiURL + `/reports/search?document=${document}&followsOrder=desc`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  followReport(reportId: number): Observable<any> {
    const headers = new HttpHeaders({
      "API-KEY": "p5iZ3e4i2hMMUMJh1bgUwFfNTS",
      "Authorization": `Bearer ${this._token}`
    });
    const query = apiURL + `/report/${reportId}/follow`;
    return this.http.put<any>(query, undefined,{headers: headers});
  }


  unfollowReport(reportId: number): Observable<any> {
    const query = apiURL + `/report/${reportId}/unfollow`;
    const headers = new HttpHeaders({
      "API-KEY": "p5iZ3e4i2hMMUMJh1bgUwFfNTS",
      "Authorization": `Bearer ${this._token}`
    });
    return this.http.put<any>(query,undefined, {headers: headers});
  }

  getReportsID(id: number) {
    const query = apiURL + `/report/${id}`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  async postReports(data: any) {
    const query = apiURL + '/reports';

    let formData = new FormData()
    formData.append("type", data.type);
    formData.append("address", data.address);
    formData.append("reference", data.reference);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("user_document", data.user_document);
    formData = await this.photoservice.setPhotos(formData);


    this.http.post(query, formData, {headers: this.headers}).subscribe(res => {
      console.log(res);
    })
  }


} 