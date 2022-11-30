import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {
    this.mostrarDatos()
   }
  
  ngOnInit() {
  }

  mostrarDatos(){
    console.log("LC: "+localStorage.getItem('usuario'))
    console.log("LC: MOSTRADOS DESDE EL HOME.PAGE.TS FUNCION mostrarDatos()")
  }

}
