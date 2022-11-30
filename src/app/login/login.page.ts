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
  constructor(
    private router: Router,
    private dbService: DbService, 
    private alertController: AlertController,
    private toastController: ToastController) {
      this.crearStorageInfoUsuario()
      console.log("LC: StorageDesdeLogin"+localStorage.getItem('usuario'))
  }

  ngOnInit() {
  }

  infoUsuario = {
    nombre: "",
    rut: "",
    correo: ""
  }

  crearStorageInfoUsuario(){
    localStorage.setItem("usuario",JSON.stringify(this.infoUsuario))
  }

  validacion = {
    user: "",
    password: ""
  }
// FORMULARIO REGISTRAR
  async mostrarFormularioRegistrar() {
    const alert = await this.alertController.create({
      header: 'Registrate',
      inputs: [
        {
          name: 'nombreCompleto',
          type: 'text',
          placeholder: 'Nombre Completo'
        },
        {
          name: 'rut',
          type: 'text',
          placeholder: 'RUT'
        },
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
            console.log("LC: Confirma Registro");
            console.log("LC: "+data.correo)
            console.log("LC: "+data.contrasena)
            console.log("LC: ------------------------")
            this.almacenarUsuario(data.nombreCompleto,data.rut,data.correo,data.contrasena)
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
  almacenarUsuario(usuario:string, rut:string, correo:string, contrasena:string){
    this.dbService.validarUsuario(correo).then((data) => {
      if(!data) { //Cuando el validarUsuario devuelve false el correo se guarda con la funcion dbServices.almacenarUsuario
        console.log("LC: USUARIO GUARDADO CORRECTAMENTE");
        this.dbService.almacenarUsuario(usuario, rut, correo, contrasena);
        this.presentToast("Usuario creado correctamente",3000);
      }else{
        console.log("LC: CORREO ELECTRONICO REPETIDO");
        this.presentToast("El correo ingresado ya esta registrado",3000);
      }
    })
  }

// FUNCION VERIFICAR USUARIOS
  verificarUsuario(){
    this.dbService.verificarUsuario(this.validacion.user, this.validacion.password).then((data) => {
      if(!data) { //Si el usuario esta registrado en la BD la funcion verificarUsuario() devolvera True
        console.log("LC: NO PUDO INGRESAR");
        this.presentToast("Datos incorrectos, Intentelo nuevamente",3000);
      }else{
        console.log("LC: INGRESO CORRECTO");
        localStorage.setItem('ingresado','true');
        console.log("LC: "+localStorage.getItem('ingresado'))
        this.usuarioListarInfo(this.validacion.user)
        this.router.navigate(['/home']);
        this.presentToast("BIENVENIDO",3000);
        
      }
    })
  }

  usuarioListarInfo(correo: string){
    // const infoUser = this.dbService.listarInfoUsuario(correo)
    this.dbService.listarInfoUsuario(correo);
    
  }
}
