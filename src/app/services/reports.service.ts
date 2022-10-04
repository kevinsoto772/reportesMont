import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportByTypeAndPage, Reportes } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { PhotoService } from './photo.service';

const apiUrl = environment.apiUrl;
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  headers: HttpHeaders;
  private reportsByType: ReportByTypeAndPage = {}


  constructor(private http: HttpClient, public photoservice: PhotoService) {
    this.headers = new HttpHeaders({
      "API-KEY": "l9HgWr22z7hEFrwF9DhHpL5f4RIv"
    });
  }


  getReports(): Observable<any> {
    const query = apiURL + '/reports';
    return this.http.get<any>(query, {headers: this.headers});
  }

  getTopHeadlinesByTypes(type: string, loadMore: boolean = false): Observable<Reportes[]> {

    const query = apiUrl + `/reportes?tipo=${type}`;
    return this.http.get<any>(query);
  }

  getReportsID(id: number) {
    const query = apiUrl + `/reportes/${id}`;
    return this.http.get<any>(query);
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
    console.log(formData);
  }


} 