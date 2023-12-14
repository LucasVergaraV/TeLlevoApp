import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
    this.user();
  }
  
// ---- Cerrar Sesion ----
  singOut(){
    this.firebaseSvc.singOut();
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  product(): Product{
    return this.utilsSvc.getFromLocalStorage('lastTrip');
  }
  
// La funcion ionViewWillEnter() se activa cada vez que el usuario entra a la pagina.
  ionViewWillEnter() {

  }

// ---- Agregar o actualizar producto ----
  addUpdateProduct(product?: Product){
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product },
    });
  }


// ---- ELIMINAR UN VIAJE ----
  async deleteProduct() {
    let path = `products/${this.product().id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(this.product().image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then(async (res) => {
        localStorage.removeItem('lastTrip')
        this.utilsSvc.saveInLocalStorage('checkTrip', false);
        this.utilsSvc.presentToast({
          message: 'Viaje eliminado con exito',
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
