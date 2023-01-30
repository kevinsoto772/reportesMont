import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './tab1/cards/cards.component';
import { DetailComponent } from './tab1/detail/detail.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map/map.component';
import { FormPart2Component } from './tab1/form-part2/form-part2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './tab2/report/report.component';
import { ReportsComponent } from './tab2/reports/reports.component';
import { DetailsComponent } from './tab2/details/details.component';

import { SwiperModule } from 'swiper/angular';
import { RegisterComponent } from './login/register/register.component';



@NgModule({
  entryComponents: [DetailComponent,
  DetailsComponent],
  declarations: [DetailComponent,
    CardsComponent,
    MapComponent, FormPart2Component, ReportComponent, ReportsComponent,
    DetailsComponent, RegisterComponent],
  exports: [DetailComponent,
    CardsComponent,
    MapComponent, FormPart2Component,
    ReportComponent, ReportsComponent, DetailsComponent, RegisterComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
