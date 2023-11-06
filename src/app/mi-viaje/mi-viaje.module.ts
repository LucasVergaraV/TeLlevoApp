import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiViajePageRoutingModule } from './mi-viaje-routing.module';

import { MiViajePage } from './mi-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiViajePageRoutingModule
  ],
  declarations: [MiViajePage]
})
export class MiViajePageModule {}
