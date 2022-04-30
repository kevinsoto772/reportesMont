import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { CardsComponent } from './cards/cards.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map/map.component';




@NgModule({
  entryComponents:[DetailComponent],
  declarations: [DetailComponent,
    CardsComponent,
  MapComponent],
  exports:[DetailComponent,
    CardsComponent,
    MapComponent],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule
  ]
})
export class ComponentsModule { }
