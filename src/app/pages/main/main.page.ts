import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title: 'Tu perfil', url:'profile', icon:'person-outline'},
    {title: 'Crea un viaje', url:'home', icon:'car-sport-outline'},
    {title: 'Busca un viaje', url:'viajes', icon:'compass-outline'},
  ];

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;

    })
  }
// Cerrar Sesion
  singOut(){
    this.firebaseSvc.singOut();
  }

}
