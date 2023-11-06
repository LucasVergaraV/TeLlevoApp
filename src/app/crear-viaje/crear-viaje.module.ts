import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearViajePageRoutingModule } from './crear-viaje-routing.module';
import { CrearViajePage } from './crear-viaje.page';
// material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSlideToggleModule,
    CrearViajePageRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  declarations: [CrearViajePage]
})
export class CrearViajePageModule {}
