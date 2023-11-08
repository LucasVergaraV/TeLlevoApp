import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController)
  toastCtrl = inject(ToastController)
  router = inject(Router);

// -----LOADING-------
  loading(){
    return this.loadingCtrl.create({spinner: 'crescent'})
  }
//-----TOAST------
//-----Alertas-----
 async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
 }

//----ROUTERLINK--------
//Enrutamiento de cualquier pagina disponible
 routerLink(url: string){
  return this.router.navigateByUrl(url);
 }

//-----LOCALSTORAGE------
//Permite guardar cualquier dato o arreglo del sistema
 saveInLocalStorage(key: string, value: any){
  return localStorage.setItem(key, JSON.stringify(value));
 }
//Permite recuperar informacion desde el localstorage
 getFromLocalStorage(key: string){
  return JSON.parse(localStorage.getItem(key)); 
 }
}
