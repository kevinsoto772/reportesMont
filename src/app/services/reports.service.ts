import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportByTypeAndPage, Reportes } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reportsByType : ReportByTypeAndPage ={ } 


  constructor(private http: HttpClient) { }

  
  getReports(): Observable<any> {
    const query = apiUrl + '/reportes';
    return this.http.get<any>(query);
  }

  getTopHeadlinesByTypes(type: string, loadMore: boolean = false): Observable<Reportes[]> {
    
    const query = apiUrl + `/reportes?tipo=${type}`;
    return this.http.get<any>(query);
  }

  getReportsID(id: number) {
    const query = apiUrl + `/reportes/${id}`;
    return this.http.get<any>(query);
  }

  postReports(formdata: any) {
    const query = apiUrl + '/reportes';

    fetch(query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formdata,
    }
    );
  }


} 