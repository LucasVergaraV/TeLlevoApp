import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserExtra } from 'src/app/models/userExtra.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    uid: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required, Validators.minLength(4)]),
    final: new FormControl('', [Validators.required, Validators.minLength(4)]),
    pasajero: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;
  userExtra = {} as UserExtra;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
  }

  // -----Tomar o Seleccionar una Foto-----
  async takeImage(){
    const dataUrl = (await this.utilsSvc.takePicture('Imagen de tu vehiculo')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }


  async submit() {
    if (this.form.valid) {
      let path = `products`;
      const loading = await this.utilsSvc.loading();
      await loading.present();
      // Subir imagen y recuperar URL
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      // Se recupera el UID del usuario para crear un viaje unico
      let uid = this.user.uid;
      this.form.controls.uid.setValue(uid);
      
      delete this.form.value.id;
      // Se comprueba si el usuario tiene viajes creados y se almacena la respuesta
      // en el localStorage - checkTrip -
      this.checkTrip();
      let checkTrip = this.utilsSvc.getFromLocalStorage('checkTrip');
      if (checkTrip === false){
        this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
          this.utilsSvc.saveInLocalStorage('lastTrip', this.form.value);
          this.utilsSvc.dismissModal({success: true});
          this.utilsSvc.presentToast({
            message: 'Viaje Creado con exito',
            duration: 1500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
        }).catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        }).finally(() => {
          loading.dismiss();
        });
      }else{
        this.utilsSvc.dismissModal({success: true});
        this.utilsSvc.presentToast({
          message: 'Ya tienes un viaje creado',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
        loading.dismiss();
      }
      
    }
  }

  checkTrip(){
    let path = `products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        // Responde si el usuario tiene o no creado un viaje
        let checkTrip = res.some((respuesta) =>{
          return respuesta.uid === this.user.uid;
        })
        console.log("Devuelve true si hay viaje creado");
        console.log(checkTrip);
        this.utilsSvc.saveInLocalStorage('checkTrip', checkTrip);
        sub.unsubscribe();
      }
    })
  }

}
