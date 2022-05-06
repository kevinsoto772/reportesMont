import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { CardsComponent } from './cards/cards.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map/map.component';
import { FormPart2Component } from './form-part2/form-part2.component';




@NgModule({
  entryComponents:[DetailComponent],
  declarations: [DetailComponent,
    CardsComponent,
  MapComponent, FormPart2Component],
  exports:[DetailComponent,
    CardsComponent,
    MapComponent,FormPart2Component],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule
  ]
})
export class ComponentsModule { }
