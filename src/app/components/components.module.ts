import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { DetailsComponent } from './details/details.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [DetailComponent,
    DetailsComponent,
    CardComponent,
  CardsComponent],
  exports:[DetailComponent,
    DetailsComponent,
    CardComponent,
  CardsComponent],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule
  ]
})
export class ComponentsModule { }
