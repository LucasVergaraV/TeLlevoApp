import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user: string="";
password:  string="";

  constructor(private router: Router,private dbService: DbService, private alertController: AlertController,private toastController: ToastController) { 
    
  }

  ngOnInit() {
  }
// FORMULARIO REGISTRAR
  async mostrarFormularioRegistrar() {
    const alert = await this.alertController.create({
      header: 'Registrate',
      inputs: [
        {
          name: 'correo',
          type: 'text',
          placeholder: 'Correo Electronico'
        },
        {
          name: 'contrasena',
          type: 'password',
          placeholder: 'Contraseña'
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
            console.log("Confirma Registro");
            this.almacenarUsuario(data.correo,data.contrasena)
          }
        }
      ]
    });

    await alert.present();
  }
// ALERTAS EMERGENTES
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }
// FUNCION ALMACENAR USUARIOS
  almacenarUsuario(correo:string, contrasena:string){
    this.dbService.validarUsuario(correo).then((data) => {
      if(!data) { //Cuando el validarUsuario devuelve false el correo se guarda con la funcion dbServices.almacenarUsuario
        console.log("LC: USUARIO GUARDADO CORRECTAMENTE");
        this.dbService.almacenarUsuario(correo, contrasena);
        this.presentToast("Usuario creado correctamente",3000);
      }else{
        console.log("LC: CORREO ELECTRONICO REPETIDO");
        this.presentToast("El correo ingresado ya esta registrado",3000);
      }
    })
  }

// FUNCION VERIFICAR USUARIOS
  verificarUsuario(){
    this.dbService.verificarUsuario(this.user, this.password).then((data) => {
      if(!data) { //Si el usuario esta registrado en la BD la funcion verificarUsuario() devolvera True
        console.log("LC: NO PUDO INGRESAR");
        this.presentToast("Datos incorrectos, Intentelo nuevamente",3000);
      }else{
        console.log("LC: INGRESO CORRECTO");
        this.router.navigate(['/credencial']);
        this.presentToast("BIENVENIDO",3000);
        
      }
    })
  }

}
