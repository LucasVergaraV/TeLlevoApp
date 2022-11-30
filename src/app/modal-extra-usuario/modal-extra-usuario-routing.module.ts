import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalExtraUsuarioPage } from './modal-extra-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalExtraUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalExtraUsuarioPageRoutingModule {}
