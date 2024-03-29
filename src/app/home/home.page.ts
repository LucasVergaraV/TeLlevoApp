import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
data: any;
  constructor(private router: Router, private activeroute: ActivatedRoute) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation()?.extras.state) { // Validamos que en la navegacion actual tenga extras
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user']; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
      }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navega al login
    });
  }
  
  Ingresar(){
    this.router.navigate(['/crear-viaje']);
  }
}
