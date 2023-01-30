import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const apiURL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders;
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    }

}
