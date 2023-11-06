import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    usuario: '',
    password: '',
  };

  constructor(
    private router: Router,
    public toastController: ToastController
  ) {}

  firebaseSvc = inject(FirebaseService);

  ngOnInit() {}

  submit(){
    
  }
  // ------------------------------------------------
  register() {
    this.router.navigate(['/register']);
  }
  // ======Validacion======
  field: string = '';
  validateModel(model: any) {
    //recorro todas las entradas que me entrega el Object entries y obtengo
    //su clave-valor
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacío
      if (value == '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }
  // ======alertas=======
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }
  // ======CODIGO ANTIGUO=======
  // Ingresar(){
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       user: this.user
  //     }
  //   };
  //   if (this.validateModel(this.user)){
  //     if (this.user.usuario == this.validacion.user){
  //       if (this.user.password == this.validacion.password){
  //         this.presentToast("Bienvenido")
  //         this.router.navigate(['/home'],navigationExtras);
  //       }else{
  //         this.presentToast("La contraseña es incorrecta",5000)
  //       }
  //     }else{
  //       this.presentToast("El usuario '"+this.user.usuario+"' No existe",5000)
  //     }
  //   }
  //   else{
  //     this.presentToast("Falta ingresar "+this.field,5000)
  //   }
  // }
}
