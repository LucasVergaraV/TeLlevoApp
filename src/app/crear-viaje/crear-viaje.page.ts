import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  viaje={
    inicio:"",
    destino:"",
    cobro:"",
    pasajeros:""
  }
  constructor(private router: Router, private activeroute: ActivatedRoute) { }
  
  crearViaje(){
  let navigationExtras: NavigationExtras = {
    state: {
      viaje: this.viaje
    }
  };
  this.router.navigate(['/mi-viaje'],navigationExtras);
  console.log(this.viaje)
  }
  ngOnInit() {
  }

}
