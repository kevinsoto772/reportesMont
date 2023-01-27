import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Report } from '../interfaces/interfaces';
import { PhotoService } from './photo.service';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  headers: HttpHeaders;


  constructor(private http: HttpClient, public photoservice: PhotoService) {
    this.headers = new HttpHeaders({
      "API-KEY": "iTp1lxv82eURtXF6Q"
    });
  }

  getReports(): Observable<any> {
    const query = apiURL + '/reports';
    return this.http.get<any>(query, {headers: this.headers});
  }

  getReportsTypes() {
    const query = apiURL + `/report-types`;
    return this.http.get<any>(query, {headers: this.headers});
  }

  getTopHeadlinesByTypes(type: number, loadMore: boolean = false): Observable<Report[]> {

    const query = apiURL + `/reports/search?type=${type}`;
    return this.http.get<any>(query, {headers: this.headers});
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