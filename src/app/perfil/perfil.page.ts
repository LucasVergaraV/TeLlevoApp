import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  constructor(
    private dbService: DbService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  infoUsuario = JSON.parse(localStorage.getItem('usuario')!)

  // FORMULARIO REGISTRAR
  async mostrarFormularioInfoExtra() {
    const alert = await this.alertController.create({
      header: 'Informacion Extra',
      inputs: [
        {
          name: 'carrera',
          type: 'text',
          placeholder: 'Carrera'
        },
        {
          name: 'semestre',
          type: 'number',
          placeholder: 'semestre actual',
          min: 1,
          max: 9
        },
        {
          name: 'celular',
          type: 'number',
          placeholder: 'N° de celular',
          attributes: {
            maxlength: 9,
          },min: 100000000,
          max: 999999999
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("Cancela Registro");
          }
        },
        {
          text: 'Registrar',
          handler: (data) => {
            this.almacenarExtraUsuario(this.infoUsuario.rut,data.carrera,data.semestre,data.celular)
          }
        }
      ]
    });

    await alert.present();
  }

  almacenarExtraUsuario(rut: string, carrera: string, semestre: number, celular: number){
    this.dbService.almacenarExtraUsuario(rut, carrera, semestre, celular);

  }
}
