import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { ModalExtraUsuarioPage } from '../modal-extra-usuario/modal-extra-usuario.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  infoUsuario = JSON.parse(localStorage.getItem('usuario')!)
  infoExtraUsuario = JSON.parse(localStorage.getItem('extraUsuario')!)
  constructor(
    private dbService: DbService,
    private alertController: AlertController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalExtraUsuarioPage,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }



  almacenarExtraUsuario(rut: string, carrera: string, semestre: number, celular: number){
    this.dbService.almacenarExtraUsuario(rut, carrera, semestre, celular);

  }
}
