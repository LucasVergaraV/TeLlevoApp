import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TomarViajeComponent } from 'src/app/shared/components/tomar-viaje/tomar-viaje.component';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
ionViewWillEnter() {
  this.getProducts();
}

// ---- Obtener colleccion de viajes ----
  getProducts(){
    let path = `products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.products = res.filter( respuesta =>{
          return respuesta.uid !== this.user().uid && respuesta.viajeCompleto === false;
        })
        console.log(res);
        console.log(this.products);
        sub.unsubscribe();
      }
    })
  }

  takeTrip(viaje?: Product){
    // Crear funcion donde el usuario tome el viaje..
    // la funcion debe crear una coleccion dentro del product
    this.utilsSvc.presentModal({
      component: TomarViajeComponent,
      cssClass: 'add-update-modal',
      componentProps: { viaje }
    })
  }

}
