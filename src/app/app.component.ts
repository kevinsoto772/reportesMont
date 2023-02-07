import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticationService } from './services/autentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{


  constructor(private autenticationService: AutenticationService, private router: Router, ) {

  }

  ngOnInit(): void {

  }

  public logOut() {
    this.autenticationService.logOut()
    this.router.navigateByUrl('/login')
  }



}
