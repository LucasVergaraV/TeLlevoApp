import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  formExtra = new FormGroup({
    id: new FormControl(''),
    checkTrip: new FormControl<boolean>(false),
    uid: new FormControl('')
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  location: Position[];

  ngOnInit() {
    this.printCurrentPosition();
    
    
  }
  printCurrentPosition(){
      const coordinates = Geolocation.getCurrentPosition();
    
      console.log('Current position:', coordinates);
    }

  async submit(){
    if (this.form.valid){

      const loading = await this.utilsSvc.loading(); 
      await loading.present();


      this.firebaseSvc.singIn(this.form.value as User).then(res => {
        console.log(res);
        this.getUserInfo(res.user.uid);
      }).catch(error =>{
        console.log(error);
        console.log('submit');
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })
    }
    
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {

          this.utilsSvc.saveInLocalStorage('user', user);
          this.utilsSvc.routerLink('/main/profile');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Bienvenido a TeLlevoApp ${user.name}`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline',
          });
        
        })
        .catch((error) => {
          console.log('submit');
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

  apiKey = 'AIzaSyB_41HlqKXl-IrI1LiLKZB-cpm4NfSuoUQ';

  mapRef = document.getElementById('map');
  
  newMap = GoogleMap.create({
    id: 'map', // Unique identifier for this map instance
    element: this.mapRef, // reference to the capacitor-google-map element
    apiKey: this.apiKey, // Your Google Maps API Key
    config: {
      center: {
        // The initial position to be rendered by the map
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8, // The initial zoom level to be rendered by the map
    },
  });

}
