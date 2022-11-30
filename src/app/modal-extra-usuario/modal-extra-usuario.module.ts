import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalExtraUsuarioPageRoutingModule } from './modal-extra-usuario-routing.module';

import { ModalExtraUsuarioPage } from './modal-extra-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalExtraUsuarioPageRoutingModule
  ],
  declarations: [ModalExtraUsuarioPage]
})
export class ModalExtraUsuarioPageModule {}
