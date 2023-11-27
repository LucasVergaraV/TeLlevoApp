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
  miViaje:any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // product: Product[] = [];

  ngOnInit() {
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
    this.getProduct();
    this.user();
  }

  getProduct(){
    let path = `products`;
    let user = this.user();
    
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log("coleccion de viajes");
        console.log(res);
        // this.product = res;
        // Responde el viaje del usuario
        this.miViaje = res.filter((respuesta) =>{
          return respuesta.uid === user.uid;
        })[0]
        console.log("Tu viaje");
        console.log(this.miViaje);
        this.lastTrip(this.miViaje);
        sub.unsubscribe();
      }
    })
  }

  lastTrip(value: any){
    this.utilsSvc.saveInLocalStorage('lastTrip',value);
    this.miViaje = value;
  }

// ---- Agregar o actualizar producto ----
  addUpdateProduct(){
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }
}
