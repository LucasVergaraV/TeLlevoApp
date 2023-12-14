import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UnsubscriptionError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tomar-viaje',
  templateUrl: './tomar-viaje.component.html',
  styleUrls: ['./tomar-viaje.component.scss'],
})
export class TomarViajeComponent  implements OnInit {
  viajeTomado: any;
  @Input() viaje: Product;
  viajeFull: boolean;
  viajeYaTomado: boolean;

  formViaje = new FormGroup({
    id: new FormControl(''),
    uid: new FormControl(''),
    image: new FormControl(''),
    inicio: new FormControl(''),
    final: new FormControl(''),
    pasajero: new FormControl(''),
    price: new FormControl(''),
    time: new FormControl(''),
    viajeCompleto: new FormControl(),
  });


  form = new FormGroup({
    uid: new FormControl(''),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  creadorViaje: User;
  cantidad: void;
  
  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ngOnInit() {
    this.obtenerCreadorViaje();
    this.cantidadPasajero()
    
  }
// ---- Recuperar usuario que creo el viaje ----
  obtenerCreadorViaje(){
  let path = `users/${this.viaje.uid}`;

  this.firebaseSvc.getDocument(path).then((user: User) => {
    this.creadorViaje = user;
  })
  }
// 
  async tomarViaje(){
    let path = `products/${this.viaje.id}/pasajeros`;
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.form.controls.uid.setValue(this.user().uid);
    this.validacionViajeTomado(path);

    if (this.viajeFull === true){
      if (this.viajeYaTomado === true){
        console.log("El usuario ya tomo este viaje");
      }if(this.viajeYaTomado === false){
        this.firebaseSvc.addDocument(path,this.form.value).then(async (res) => {
          console.log("viaje tomado");
          this.utilsSvc.dismissModal({ success: true });
          this.utilsSvc.presentToast({
              message: 'Viaje tomado',
              duration: 1500,
              color: 'success',
              position: 'middle',
              icon: 'checkmark-circle-outline',
            });
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
        }
      }
    }

// ---- TOMAR VIAJE ----
  // async tomarViajes() {
  //   // let path = `products/${this.viaje.id}/pasajeros`;
  //   let path2 = `products/${this.viaje.id}`;
  //   // const loading = await this.utilsSvc.loading();
  //   // await loading.present();
  //   // this.form.controls.uid.setValue(this.user().uid);
    
  //   let sub = this.firebaseSvc.getCollectionData(path).subscribe({
  //     next: (res: any) => {
  //       if (res.length >= this.viaje.pasajero){
  //         console.log("ya no se pueden agregar pasajeros");
  //         this.viaje.viajeCompleto = true;
  //         this.firebaseSvc.updateDocument(path2, this.viaje);
  //         this.utilsSvc.presentToast({
  //           message: 'Viaje Completo',
  //           duration: 1500,
  //           color: 'success',
  //           position: 'middle',
  //           icon: 'hand-right-outline',
  //         });
  //         this.utilsSvc.dismissModal({ success: true });
  //         loading.dismiss();
  //         sub.unsubscribe();

  //       } else { //se puede tomar el viaje
  //         let viajeYaTomado = res.some((respuesta) => {
  //           return respuesta.uid === this.user().uid;
  //         });
  //         if (viajeYaTomado === true) {
  //         console.log(viajeYaTomado);
  //         console.log("se puede agregar pasajero");
  //         this.guardarViajetomado(this.viaje);
  //         this.firebaseSvc.addDocument(path,this.form.value).then(async (res) => {
  //           console.log("viaje tomado");
  //           this.utilsSvc.dismissModal({ success: true });
  //           this.utilsSvc.presentToast({
  //               message: 'Viaje tomado',
  //               duration: 1500,
  //               color: 'success',
  //               position: 'middle',
  //               icon: 'checkmark-circle-outline',
  //             });
  //             sub.unsubscribe();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           this.utilsSvc.presentToast({
  //             message: error.message,
  //             duration: 2500,
  //             color: 'primary',
  //             position: 'middle',
  //             icon: 'alert-circle-outline',
  //           });
  //         })
  //         .finally(() => {
  //           loading.dismiss();
  //         });
  //         }
  //       }
  //     }
  //   })
  // }
// ---- Guardar viaje tomado ----
  guardarViajetomado(viajeTomado: Product){
    let path = `users/${this.user().uid}/viajeTomado`;
   

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.viajeTomado = res.filter((respuesta) =>{
          return respuesta;
        })[0]
        console.log(res.length);
        if (res.length === 1){
          this.utilsSvc.presentToast({
            message: 'Ya haz tomado un viaje',
            duration: 1500,
            color: 'primary',
            position: 'middle',
          });
        }else{
          this.firebaseSvc.addDocument(path,viajeTomado);
        }
        sub.unsubscribe();
      }
    })
  }

// ---- Cantidad de Pasajeros ----
cantidadPasajero() {
  let path = `products/${this.viaje.id}/pasajeros`;
  this.firebaseSvc.getCollectionData(path).subscribe({
    next: (res: any) => {
      if (res.length >= this.viaje.pasajero){
        console.log("ya no se pueden agregar pasajeros : devuelve FALSE");
        this.viajeFull = false;
      } else {
        console.log("se puede agregar pasajero : devuelve TRUE");
        this.viajeFull = true;
      }
    }
  })
}
validacionViajeTomado(path: string){
  let sub = this.firebaseSvc.getCollectionData(path).subscribe({
    next: (res: any) => {
      this.viajeYaTomado = res.some((respuesta) => {
        return respuesta.uid === this.user().uid;
      });
    }
  })
}

  prueba(){
    if (this.viajeFull === true){
      console.log("HOLA MUNDO");
    }if (this.viajeFull === false) {
      console.log("HOLA MUNDOn't");
    }
  }
}
