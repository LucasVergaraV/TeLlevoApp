import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-modal-extra-usuario',
  templateUrl: './modal-extra-usuario.page.html',
  styleUrls: ['./modal-extra-usuario.page.scss'],
})
export class ModalExtraUsuarioPage implements OnInit {
  infoExtraUsuario = {
    carrera: "",
    semestre: "",
    numeroCelular: ""
  }
  infoUsuario = JSON.parse(localStorage.getItem('usuario')!)
  constructor(
    private dbService: DbService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    console.log("LC: "+this.infoExtraUsuario.carrera);
    console.log("LC: "+this.infoExtraUsuario.semestre);
    console.log("LC: "+this.infoExtraUsuario.numeroCelular);
    console.log("LC: "+JSON.stringify(this.infoExtraUsuario));
    this.almacenarExtraUsuario(this.infoUsuario.rut,this.infoExtraUsuario.carrera,this.infoExtraUsuario.semestre,this.infoExtraUsuario.numeroCelular)
    return this.modalCtrl.dismiss('confirm');
  }

  almacenarExtraUsuario(rut: string, carrera: string, semestre: string, celular: string){
    this.dbService.almacenarExtraUsuario(rut, carrera, semestre, celular);
  }

}
