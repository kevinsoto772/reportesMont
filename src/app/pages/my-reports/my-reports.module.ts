import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReportsPageRoutingModule } from './my-reports-routing.module';

import { MyReportsPage } from './my-reports.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReportsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyReportsPage]
})
export class MyReportsPageModule {}
